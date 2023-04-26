import Link from 'next/link'
import Image from 'next/image'
import Instagram from '@/public/icons/instagram.png'
import Facebook from '@/public/icons/facebook.png'
import Twitter from '@/public/icons/twitter.png'
import TikTok from '@/public/icons/tik-tok.png'


export default function Socials({ location }) {

  const social = location.attributes.social;

  return (
    <div>
      <h2 className="border-b-2 border-black">Social Media</h2>
      {social ? (
        <div className="grid">
          {social.instagramUrl && (
            <Link href={social.instagramUrl}>
              <a aria-label={`Navigate to our Instagram`} className={`underline hover:text-gray-500 focus:text-gray-500 no-underline`}>
              <Image
                src={Instagram}
                width={24}
                height={24}
                className="object-cover"
                alt={`Instagram`}
              />
              </a>
            </Link>
          )}
          {social.facebookUrl && (
            <Link href={social.facebookUrl}>
              <a aria-label={`Navigate to our Facebook`} className={`underline hover:text-gray-500 focus:text-gray-500 no-underline`}>
              <Image
                src={Facebook}
                width={24}
                height={24}
                className="object-cover"
                alt={`Facebook`}
              />
              </a>
            </Link>
          )}
          {social.twitterUrl && (
            <Link href={social.twitterUrl}>
              <a aria-label={`Navigate to our Twitter`} className={`underline hover:text-gray-500 focus:text-gray-500 no-underline`}>
              <Image
                src={Twitter}
                width={24}
                height={24}
                className="object-cover"
                alt={`Twitter`}
              />
              </a>
            </Link>
          )}
          {social.tikTokUrl && (
            <Link href={social.tikTokUrl}>
              <a aria-label={`Navigate to our TiK Toc`} className={`underline hover:text-gray-500 focus:text-gray-500 no-underline`}>
              <Image
                src={TikTok}
                width={24}
                height={24}
                className="object-cover"
                alt={`Tik Tok`}
              />
              </a>
            </Link>
          )}
        </div>
      ) : (<div>Social Links Coming Soon</div>)}
    </div>
  )
  
}