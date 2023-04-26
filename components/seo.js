import { NextSeo } from 'next-seo'

export default function Seo( {pageSeo, defaultSeo, siteName} ) {

  //Get defaults from Global. This method allows for global to not have to be filled
  //out during development
  const defaultTitle = defaultSeo && defaultSeo.metaTitle === siteName ? siteName 
    : siteName ? `${defaultSeo.metaTitle} | ${siteName}`
    : 'Front Burner basic';
  const defaultDescription = defaultSeo && defaultSeo.metaDesc ? defaultSeo.metaDesc
    : 'Basic meta description';
  const defaultImage = defaultSeo && defaultSeo.shareGraphic ? defaultSeo.shareGraphic.asset.url
    : 'https://cdn.sanity.io/images/gvi07ntv/production/7aa4f9f223e6dce58c28c485fb3d295fc4c8cd01-1026x514.jpg';


  const metaTitle = pageSeo && pageSeo.metaTitle ? `${pageSeo.metaTitle} | ${siteName}` 
    : defaultTitle;
  const metaDesc = pageSeo && pageSeo.metaDesc ? pageSeo.metaDesc 
    : defaultDescription;
  const metaImage = pageSeo && pageSeo.shareGraphic ? pageSeo.shareGraphic.asset.url 
    : defaultImage;
  

  return (
    <NextSeo 
      title={metaTitle} 
      description={metaDesc}
      openGraph={{
        images: [
          { url: metaImage },
        ],
      }}
    />
  )
}