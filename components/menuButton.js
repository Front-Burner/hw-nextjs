import { LazyMotion, domAnimation, m } from 'framer-motion'
import TopBun from '@/public/svg/topBun.svg'
import Inside from '@/public/svg/inside.svg'
import BottomBun from '@/public/svg/bottomBun.svg'



export default function MenuButton({ onClick, isOpen }) {

  return (
    <LazyMotion features={domAnimation}>
      <m.button
        className="flex flex-wrap w-[50px] gap-y-[2px] justify-center"
        onClick={onClick}
        animate={isOpen ? "open" : "closed"}
        initial={false}
      >
        <m.div
          variants={{
            closed: { y: 0 },
            open: { y: "-4px" }
          }}
        >
          <TopBun width={30} />
        </m.div>
        <m.div
          variants={{
            closed: { rotate: 0 },
            open: { rotate: "15deg" }
          }}
        >
          <Inside width={32} />
        </m.div>
        <m.div
          variants={{
            closed: { rotate: 0 },
            open: { rotate: "-15deg" }
          }}
        >
          <Inside width={32} />
        </m.div>
        <m.div
          variants={{
            closed: { y: 0 },
            open: { y: "4px" }
          }}
        >
          <BottomBun width={30} />
        </m.div>
      </m.button>
    </LazyMotion>
  );
};