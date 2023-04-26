export default function Hours({ location }) {


  return (
    <div>
      <h2 className="border-b-2 border-black">Hours</h2>
      {location.attributes.publishHours && location.attributes.hours.length > 0 ? (
        <>
          {location.attributes.hours && location.attributes.hours.map((hour, i=0) => {
      
            return (
              <p key={`${location.title}-hours-${i+1}`}>{hour.hoursField}</p>
            )
          })}
        </>
      ) : (
        <div>Location Coming Soon</div>
      )}
    </div>
  )
}