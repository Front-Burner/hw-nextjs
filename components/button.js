export default function Button({ color, text, linkTo, extraClasses }) {
  return (
    <p className="w-[10rem] h-[4rem] text-center text-3xl font-cast relative group border-2 text-white border-gray-600">
      <a className="uppercase" href={linkTo}>
        {text}
      </a>
      <span
        className={`absolute left-0 translate-y-[7px] translate-x-[7px] w-full bg-maroon -z-10 h-full  group-hover:translate-x-[0px] group-hover:translate-y-[0px] group-hover:transition-all`}
      ></span>
    </p>
  );
}
