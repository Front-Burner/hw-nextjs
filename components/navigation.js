import FancyLink from '@/components/fancyLink'

export default function Navigation({ navigation }) {


  return (
    <>
      { navigation  ? navigation.items.map((item) => {

        return (
          <FancyLink key={item.title} destination={`/${item.pageRoute.slug.current}`} a11yText={`Navigate to the ${item.title} page`} label={item.title} extraClasses={`no-underline`} />
        )
        }) : (
        <>
          <FancyLink destination="/" a11yText="Navigate to the home page" label="Test" extraClasses={`no-underline`} />
          <FancyLink destination="/menu" a11yText="Navigate to the Menu page" label="Menu" extraClasses={`no-underline`} />
          <FancyLink destination="/locations" a11yText="Navigate to the Locations page" label="Locations" extraClasses={`no-underline`} />
        </>
      )}
    </>
  )
}