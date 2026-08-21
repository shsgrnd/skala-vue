const OUTFIT_MAP = {
  male: {
    VERY_HOT: {
      top: '매우 얇은 긴팔 면접용 셔츠',
      bottom: '통기성이 좋은 여름용 슬랙스',
      outer: '얇은 여름용 정장 재킷',
      shoes: '통풍이 잘되는 단정한 구두',
    },
    HOT: {
      top: '얇은 긴팔 셔츠',
      bottom: '여름용 슬랙스',
      outer: '여름용 정장 재킷',
      shoes: '단정한 구두',
    },
    COMFORTABLE: {
      top: '일반 긴팔 셔츠',
      bottom: '정장 슬랙스',
      outer: '일반 정장 재킷',
      shoes: '단정한 구두',
    },
    COOL: {
      top: '긴팔 셔츠',
      bottom: '정장 슬랙스',
      outer: '정장 재킷과 필요 시 얇은 니트',
      shoes: '단정한 구두',
    },
    CHILLY: {
      top: '긴팔 셔츠와 얇은 니트',
      bottom: '도톰한 정장 슬랙스',
      outer: '정장 재킷 또는 얇은 코트',
      shoes: '단정한 구두',
    },
    COLD: {
      top: '셔츠와 보온 니트',
      bottom: '겨울용 정장 슬랙스',
      outer: '정장 재킷과 코트',
      shoes: '미끄럼이 적은 단정한 구두',
    },
    VERY_COLD: {
      top: '셔츠와 보온 이너 또는 니트',
      bottom: '겨울용 정장 슬랙스',
      outer: '정장 재킷과 두꺼운 코트',
      shoes: '미끄럼이 적은 방한 구두',
    },
  },
  female: {
    VERY_HOT: {
      top: '매우 얇은 면접용 블라우스',
      bottom: '여름용 슬랙스 또는 단정한 스커트',
      outer: '얇은 여름용 정장 재킷',
      shoes: '통풍이 잘되는 단정한 구두',
    },
    HOT: {
      top: '얇은 블라우스',
      bottom: '여름용 슬랙스 또는 단정한 스커트',
      outer: '여름용 정장 재킷',
      shoes: '단정한 구두',
    },
    COMFORTABLE: {
      top: '일반 블라우스',
      bottom: '슬랙스 또는 단정한 스커트',
      outer: '일반 정장 재킷',
      shoes: '단정한 구두',
    },
    COOL: {
      top: '긴팔 블라우스',
      bottom: '슬랙스 또는 단정한 스커트',
      outer: '정장 재킷과 필요 시 얇은 가디건',
      shoes: '단정한 구두',
    },
    CHILLY: {
      top: '긴팔 블라우스와 얇은 니트',
      bottom: '도톰한 슬랙스 또는 스커트',
      outer: '정장 재킷 또는 얇은 코트',
      shoes: '단정한 구두',
    },
    COLD: {
      top: '블라우스와 보온 니트',
      bottom: '겨울용 슬랙스 또는 스커트',
      outer: '정장 재킷과 코트',
      shoes: '미끄럼이 적은 단정한 구두',
    },
    VERY_COLD: {
      top: '블라우스와 보온 이너 또는 니트',
      bottom: '겨울용 슬랙스 또는 스커트',
      outer: '정장 재킷과 두꺼운 코트',
      shoes: '미끄럼이 적은 방한 구두',
    },
  },
}

const getThermalLevel = (temperature) => {
  if (temperature >= 30) return 'VERY_HOT'
  if (temperature >= 25) return 'HOT'
  if (temperature >= 20) return 'COMFORTABLE'
  if (temperature >= 15) return 'COOL'
  if (temperature >= 10) return 'CHILLY'
  if (temperature >= 5) return 'COLD'
  return 'VERY_COLD'
}

const getHumidityLevel = (humidity) => {
  if (humidity >= 85) return 'VERY_HIGH'
  if (humidity >= 70) return 'HIGH'
  if (humidity >= 40) return 'NORMAL'
  return 'DRY'
}

const getPrecipitationLevel = ({ rain = 0, snow = 0, weather_main: weatherMain }) => {
  if (snow > 0 || weatherMain === 'Snow') return 'SNOW'
  if (rain >= 10) return 'VERY_HEAVY_RAIN'
  if (rain >= 5) return 'HEAVY_RAIN'
  if (rain >= 1) return 'MODERATE_RAIN'
  if (rain > 0 || ['Rain', 'Drizzle', 'Thunderstorm'].includes(weatherMain)) return 'LIGHT_RAIN'
  return 'NONE'
}

const getWindLevel = (wind) => {
  if (wind >= 12) return 'VERY_STRONG'
  if (wind >= 8) return 'STRONG'
  if (wind >= 5) return 'WINDY'
  return 'NORMAL'
}

export const analyzeWeather = (city) => ({
  thermalLevel: getThermalLevel(Number(city.feel_temp ?? city.temp ?? 0)),
  humidityLevel: getHumidityLevel(Number(city.humidity ?? 0)),
  precipitationLevel: getPrecipitationLevel(city),
  windLevel: getWindLevel(Number(city.wind ?? 0)),
  weatherMain: city.weather_main ?? 'Clear',
})

export const buildOutfitRecommendation = (city, gender = 'male') => {
  const analysis = analyzeWeather(city)
  const base = (OUTFIT_MAP[gender] ?? OUTFIT_MAP.male)[analysis.thermalLevel]
  const recommendation = { ...base }
  const accessories = []
  const tips = []

  if (analysis.thermalLevel === 'VERY_HOT') {
    tips.push('이동 중에는 재킷을 벗고 면접 장소에 도착한 뒤 착용하세요.')
  }

  if (analysis.humidityLevel === 'HIGH') {
    tips.push('습도가 높으므로 통기성이 좋은 소재를 선택하고 이동 중에는 재킷을 벗어두세요.')
  } else if (analysis.humidityLevel === 'VERY_HIGH') {
    accessories.push('손수건', '여분 셔츠 또는 블라우스')
    tips.push('습도가 매우 높으므로 얇고 통기성이 좋은 소재로 레이어를 최소화하세요.')
    tips.push('면접 장소에 도착한 뒤 재킷을 착용하세요.')
  }

  if (analysis.precipitationLevel === 'LIGHT_RAIN') {
    accessories.push('접이식 우산')
  } else if (analysis.precipitationLevel === 'MODERATE_RAIN') {
    accessories.push('우산')
    tips.push('물에 강한 신발을 선택하거나 젖은 신발을 정리할 준비를 하세요.')
  } else if (analysis.precipitationLevel === 'HEAVY_RAIN') {
    recommendation.outer = `${recommendation.outer} + 방수 가능한 외투`
    accessories.push('우산', '여분 양말')
  } else if (analysis.precipitationLevel === 'VERY_HEAVY_RAIN') {
    recommendation.outer = `${recommendation.outer} + 방수 외투`
    accessories.push('우산', '여분 양말', '여분 셔츠 또는 블라우스')
    tips.push('평소보다 이동 시간을 여유 있게 잡으세요.')
  } else if (analysis.precipitationLevel === 'SNOW') {
    recommendation.outer = `${recommendation.outer} + 보온 가능한 코트`
    tips.push('미끄러운 노면을 고려해 접지력이 좋은 신발을 선택하세요.')
  }

  if (analysis.weatherMain === 'Thunderstorm') {
    recommendation.outer = `${recommendation.outer} + 방수 외투`
    accessories.push('우산')
    tips.push('뇌우에 대비해 이동 시간을 충분히 확보하세요.')
  } else if (['Mist', 'Fog'].includes(analysis.weatherMain)) {
    tips.push('안개로 시야가 흐릴 수 있으니 이동할 때 주의하세요.')
  }

  if (analysis.windLevel === 'WINDY') {
    tips.push('바람을 막을 수 있도록 재킷이나 얇은 겉옷을 챙기세요.')
  } else if (analysis.windLevel === 'STRONG') {
    tips.push('강한 바람에 재킷이나 코트가 흩날리지 않도록 주의하세요.')
  } else if (analysis.windLevel === 'VERY_STRONG') {
    tips.push('매우 강한 바람이 불어 우산 사용과 이동 시 안전에 주의하세요.')
    if (analysis.precipitationLevel.includes('RAIN')) {
      recommendation.outer = `${recommendation.outer} + 방수 외투 우선`
      tips.push('강풍과 비가 함께 오므로 우산보다 방수 외투를 우선하세요.')
    }
  }

  return {
    ...recommendation,
    accessories: [...new Set(accessories)],
    tips: [...new Set(tips)],
  }
}
