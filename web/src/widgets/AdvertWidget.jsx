import { useTheme, Typography } from '@mui/material'

import WidgetWrapper from 'src/components/WidgetWrapper'
import FlexBetween from 'src/components/FlexBetween'
import Advert from 'src/assets/advert.jpeg'

const AdvertWidget = () => {
  const { palette } = useTheme()
  const neutralDark = palette.neutral.dark
  const neutralMedium = palette.neutral.medium
  const neutralMain = palette.neutral.main

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography variant="h5" sx={{ color: neutralDark, fontWeight: '500' }}>
          Sponsored
        </Typography>

        <Typography sx={{ color: neutralMedium }}>Create Add</Typography>
      </FlexBetween>

      <img
        src={Advert}
        alt="Advert"
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '0.75rem',
          margin: '0.75rem 0',
        }}
      />

      <FlexBetween>
        <Typography color={neutralMain}>MikaCosmetics</Typography>
        <Typography color={neutralMedium}>mikacosmetics.com</Typography>
      </FlexBetween>

      <Typography sx={{ color: neutralMedium, m: '0.5rem 0' }}>
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  )
}
export default AdvertWidget
