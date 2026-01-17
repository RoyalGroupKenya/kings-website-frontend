export default function myImageLoader({ src, width, quality }) {
  return `https://kingsdevelopersapi.co.ke${src}?w=${width}&q=${quality || 75}`
}