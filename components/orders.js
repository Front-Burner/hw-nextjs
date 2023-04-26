import FancyLink from "./fancyLink"

export default function Orders({ location }) {


  return (
    <div>
      <h2 className="border-b-2 border-black">Order</h2>
      {location.attributes.orderUrl && location.attributes.orderUrl.length > 0 ? (
        <>
          {location.attributes.orderUrl.map((item) => {
            
            if (item.active === true) {
              return (
                <FancyLink key={item.title} destination={item.url} a11yText={`Navigate to the ${item.title}`} label={item.title} extraClasses={`no-underline`} />
              )
            }
        })}
        </>
      ) : (
        <div>Order Links Coming Soon</div>
      )}
    </div>
  )
}