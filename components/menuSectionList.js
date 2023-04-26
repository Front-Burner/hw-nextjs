import MenuSection from "./menuSection"

export default function MenuSectionList({ location }) {

  // const itemOne = location.attributes.menus.data.filter(menuItem => menuItem.attributes.section.includes('itemOne')) || 'notActive'

  return (
    <div>
      <h2 className="border-b-2 border-black">Menu List w/ sections</h2>
      {location.attributes.publishMenu && location.attributes.menus.data.length > 0 ? (
        <>
          <div className="flex gap-x-1 justify-center">
            {location.attributes.publishPrices && (
              <>
                {location.attributes.basePriceOne && (
                  <p>{location.attributes.basePriceOne}</p>
                )}
                {location.attributes.basePriceTwo && (
                  <p>{location.attributes.basePriceTwo}</p>
                )}
                {location.attributes.basePriceThree && (
                  <p>{location.attributes.basePriceThree}</p>
                )}
              </>
            )}
          </div>
          <MenuSection 
            title={`itemOne`}
            location={location}
          />
          <MenuSection 
            title={`itemTwo`}
            location={location}
          />
          <MenuSection 
            title={`itemThree`}
            location={location}
          />
        </>
      ) : (
        <div>
          Coming Soon
        </div>
      )}
    </div>
  )
}