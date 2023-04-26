import MenuList from "./menuList"

export default function MenuSection({ title, location }) {

  const newLocation = JSON.parse(JSON.stringify(location));
  const filter = newLocation.attributes.menus.data.filter(menuItem => menuItem.attributes.section.includes(title)) || 'notActive'
  newLocation.attributes.menus.data = filter
  

  if (filter  !== 'notActive' && filter.length > 0) {

    return (
      <div className="pb-4">
      <h3>{title}</h3>
      <MenuList location={newLocation} parent={false} />
    </div>
    )
  }

  else {

    return null
  }
}