export const temperatureEnum = {
    "00": "Отсутствует",
    "28":  "+2 +8",
    "225": "+2 +25",
    "-25-5": "-25 -5"
}

export const temperatureValues: Record<string, {min: number, max: number}> = {
    "00": {
        min: 0,
        max: 0
    },
    "28": {
        min: 2,
        max: 8
    },
    "225": {
        min: 2,
        max: 25
    },
    "-25-5": {
        min: -25,
        max: -5
    }
}

export const temperatureKeys = [
    "00",
    "28",
    "225",
    "-25-5"
]

export const temperatureSelectOptions = temperatureKeys.map((el: keyof typeof temperatureEnum) => ({
    value: el,
    label: temperatureEnum[el]
}))