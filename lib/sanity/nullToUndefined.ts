// Used to turn any GROQ value of null into undefined
// If it's part of the utils file, then it causes build errors when it's imported into server components
export function nullToUndefined(value: any) {
  if (value === null) {
    return undefined
  }

  if (typeof value === 'object') {
    for (const k in value) {
      if (value.hasOwnProperty(k)) {
        value[k] = nullToUndefined(value[k])
      }
    }
  }

  return value
}
