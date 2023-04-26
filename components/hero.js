import Image from "@/components/image";
import BlockContent from '@sanity/block-content-to-react'

export default function Hero({ text, image, layout }) {
  let layoutClass = '';

  if (layout == 'image-right') {
    layoutClass = 'flex-row-reverse'
  }

  return (
    <div className={`flex flex-wrap p-3 ${layoutClass}`}>
      <div className="w-full md:w-1/2 mb-5 md:mb-0 relative overflow-hidden">
        <Image
          image={image}
          focalPoint={image.hotspot}
          widthOverride={600}
          className="w-full h-[350px] grid items-center"
        />
      </div>
      <div className="w-full md:w-1/2 indent-12 flex items-center justify-center">
        <div className="w-full md:w-9/12 content">
          <BlockContent serializers={{ container: ({ children }) => children }} blocks={text} />
        </div>
      </div>
    </div>
  )
}