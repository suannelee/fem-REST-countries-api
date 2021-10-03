const size = {
    xs: '320px',
    sm: '600px',
    md: '992px',
    lg: '1440px',
   }
   const device = {
    xs: `(min-width: ${size.xs})`,
    sm: `(min-width: ${size.sm})`,
    md: `(min-width: ${size.md})`,
    lg: `(min-width: ${size.lg})`
   }
   export default {size, device}