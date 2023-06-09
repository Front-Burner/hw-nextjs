import Hero from "@/components/hero";
import CarouselHero from "@/components/carouselHero";

const bodySerializers = {
  hero: {
    component: Hero,
    wrapper: ({ children }) => <section>{children}</section>,
  },
  carouselHero: {
    component: CarouselHero,
    wrapper: ({ children }) => <section>{children}</section>,
  },
};

function getSerializers() {
  const res = {};
  for (const [key, value] of Object.entries(bodySerializers)) {
    if (key === "block") continue;
    const Component = value.component;
    res[key] = (props) => <Component {...props.node} />;
  }
  return res;
}

export const blockSerializers = getSerializers();

const Sections = ({ body }) => {
  if (!body) return <></>;
  return body.map((item) => {
    const type = item._type;
    const serializer = bodySerializers[type];
    const Component = serializer?.component;
    const args = serializer?.args;
    const Wrapper = serializer?.wrapper;

    if (!Component || !serializer)
      throw new Error(`No serializer implemented for body object: ${type}`);

    return Wrapper ? (
      <Wrapper key={item._key}>
        <Component {...item} {...args} />
      </Wrapper>
    ) : (
      <Component key={item._key} {...item} {...args} />
    );
  });
};

export default Sections;
