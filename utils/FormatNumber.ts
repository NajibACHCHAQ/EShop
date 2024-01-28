import React from 'react'

export const FormatNumber = (digit:number) => {
  return new Intl.NumberFormat('fr-Fr').format(digit)
}
