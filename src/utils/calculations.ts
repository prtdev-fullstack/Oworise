export function calculateCommercialDiscount(
  nominal: number,
  rate: number,
  days: number
) {
  const rateDecimal = rate / 100;
  const discount = (nominal * rateDecimal * days) / 360;
  const presentValue = nominal - discount;

  return {
    discount: Number(discount.toFixed(2)),
    presentValue: Number(presentValue.toFixed(2)),
  };
}

export function calculateRationalDiscount(
  nominal: number,
  rate: number,
  days: number
) {
  const rateDecimal = rate / 100;
  const factor = 1 + (rateDecimal * days) / 360;
  const presentValue = nominal / factor;
  const discount = nominal - presentValue;

  return {
    discount: Number(discount.toFixed(2)),
    presentValue: Number(presentValue.toFixed(2)),
  };
}

export function calculateAgios(
  nominal: number,
  rate: number,
  days: number,
  commission: number,
  tva: number
) {
  const rateDecimal = rate / 100;
  const commissionDecimal = commission / 100;
  const tvaDecimal = tva / 100;

  const discount = (nominal * rateDecimal * days) / 360;
  const commissionAmount = nominal * commissionDecimal;
  
  const agiosHT = discount + commissionAmount;
  const agiosTTC = agiosHT * (1 + tvaDecimal);
  
  const netHT = nominal - agiosHT;
  const netTTC = nominal - agiosTTC;

  return {
    agiosHT: Number(agiosHT.toFixed(2)),
    agiosTTC: Number(agiosTTC.toFixed(2)),
    netHT: Number(netHT.toFixed(2)),
    netTTC: Number(netTTC.toFixed(2)),
  };
}

export function calculateRates(
  nominal: number,
  rate: number,
  days: number,
  commission: number
) {
  const rateDecimal = rate / 100;
  const commissionDecimal = commission / 100;

  const discount = (nominal * rateDecimal * days) / 360;
  const commissionAmount = nominal * commissionDecimal;
  const agios = discount + commissionAmount;
  const net = nominal - agios;

  // Taux réel d'escompte
  const tre = (agios * 360) / (nominal * days) * 100;
  
  // Taux de placement
  const tp = (agios * 360) / (net * days) * 100;
  
  // Taux de revient (similaire au taux de placement dans ce contexte)
  const tr = tp;

  return {
    tre: Number(tre.toFixed(2)),
    tp: Number(tp.toFixed(2)),
    tr: Number(tr.toFixed(2)),
  };
}

export function calculateEquivalentDate(effects: { amount: number; dueDate: string }[]) {
  // Validate input dates
  const validDates = effects.every(effect => {
    const date = new Date(effect.dueDate);
    return !isNaN(date.getTime());
  });

  if (!validDates) {
    return null;
  }

  const totalAmount = effects.reduce((sum, effect) => sum + effect.amount, 0);
  
  // Find earliest date as base date
  const dates = effects.map(e => new Date(e.dueDate).getTime());
  const baseDate = new Date(Math.min(...dates));
  
  if (isNaN(baseDate.getTime())) {
    return null;
  }

  let weightedSum = 0;

  effects.forEach(effect => {
    const effectDate = new Date(effect.dueDate);
    const daysDiff = Math.round((effectDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
    weightedSum += effect.amount * daysDiff;
  });

  const averageDays = Math.round(weightedSum / totalAmount);
  const equivalentDate = new Date(baseDate.getTime() + averageDays * 24 * 60 * 60 * 1000);

  // Validate final date
  if (isNaN(equivalentDate.getTime())) {
    return null;
  }

  return {
    equivalentDate: equivalentDate.toISOString().split('T')[0],
    weightedDays: averageDays,
  };
}