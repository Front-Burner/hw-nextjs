
export default function MenuList({ menu, publishPrices, locationId }) {

  //set date
  let date = new Date();

  console.log(locationId)
  console.log(menu)
  
  return (
    <div>
      {menu.length > 0 ? (
        <>
          { menu && menu.map((menuItem) => {

            const locals = menuItem.editByLocation?.filter(node => node.location._ref === locationId);
            const local = locals && locals[0];

            


            //get first day for default and edit by location
            const firstDay = new Date(menuItem.dates.firstDay)
            const checkFirstDay = firstDay < date;
            const editFirstDay = local && new Date(local.dates?.firstDay)
            const checkEditFirstDay = local && editFirstDay && editFirstDay < date ? true 
              : false;

              

            //get last day for default and edit by location
            const lastDay = new Date(menuItem.dates.lastDay) 
            const checkLastDay = lastDay && lastDay > date ? true 
              : lastDay.toString() === 'Invalid Date' ? true 
              : false;
            const editLastDay = local && new Date(local.dates?.lastDay)
            const checkEditLastDay = local && editLastDay && editLastDay > date ? true
              : false;


            //This checks if the item exists & is active on editByLocation. 
            //If either is false it then checks if the item is active on the default menu. 
            //This has the ability to show an item if its active on editByLocation but not active on the default.
            const item = local && local.active && checkEditFirstDay && checkEditLastDay ? local 
              : local && local.active && checkEditFirstDay &! checkEditLastDay ? 'notActive'
              : menuItem.active && checkFirstDay && checkLastDay ? menuItem 
              : 'notActive';

              

            //Create fallback object. This is for remaining fields not included in logic above.
            const finalItem = {
              title: item.title ? item.title : menuItem.title,
              price: item.price? item.price : menuItem.price,
              description: item.description ? item.description : menuItem.description
            } 

            if (item !== 'notActive') {

              return (
                <div key={`menuItem${menuItem._id}`}>
                  <p>{`${finalItem.title}`}</p>
                  {finalItem.description && (
                    <small>{finalItem.description}</small>
                  )}
                  {publishPrices && finalItem.price && (
                    <small>{` $${finalItem.price}`}</small>
                  )}
                </div>
                
              )
            }
            }) }
        </>
      ) : (
        <div>Menu Coming Soon</div>
      )}
    </div>
  )
}