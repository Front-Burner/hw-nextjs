import FancyLink from "@/components/fancyLink";

export default function Footer({ contact }) {
  return (
    <footer className="w-full h-[3.5rem] px-5">
      <div className="py-4 space-x-6 text-center border-t border-black">
        <FancyLink
          destination="/contact"
          a11yText="Navigate to the contact page"
          label="Contact"
          extraClasses="hover:underline no-underline"
        />
      </div>
    </footer>
  );
}
