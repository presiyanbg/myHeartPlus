import { ImagesSlider } from "@/components/ui/image-slider/image-slider";
import ImagesServices from "@/services/imagesServices/imagesServices";

const HeroBanner = async () => {
    let images: string[] = await ImagesServices().getBanners()

    // Add API route for image
    images = images.map((image: string) => {
        return process.env.NEXT_PUBLIC_API_URL + image;
    });

    return (
        <div className="w-full h-full-dynamic text-center flex items-center justify-items-center">
            <ImagesSlider images={images}>
                <div className="pt-44 z-50 absolute">
                    <div className="text-white pb-10 text-center w-1/2 mx-auto">
                        <h1 className="pb-1">myHeart+</h1>

                        <p>
                            Всеки един от нас заслужава да живее живот, изпълнен с енергия, радост и благополучие. И точно затова сме създали този сайт - за да ви помогнем да постигнете и поддържате здравословен начин на живот.
                        </p>
                    </div>

                    <button className="px-6 py-2 bg-transparent border border-white text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                        Присъедини се сега!
                    </button>

                </div>
            </ImagesSlider>
        </div>
    );
}

export default HeroBanner;