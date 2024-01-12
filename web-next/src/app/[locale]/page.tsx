import { Button, Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";


const Home = async () => {


    return (
        <>
            <div className="text-center py-8">
                <h1>FIT 4 HEALTH</h1>
            </div>

            <div className="grid grid-cols-6 gap-8">
                <div></div>
                <div className=" col-span-4 ">
                    <hr />
                </div>
                <div></div>

                <div></div>

                <div className="hover:cursor-pointer hover:scale-110 transition duration-500 cursor-pointer hover:z-50">
                    <Card isFooterBlurred className="w-full h-[400px] col-span-12 sm:col-span-5">
                        <div className="flex items-center justify-items-center h-full">
                            <span className="text-center w-full">
                                Person image
                            </span>
                        </div>

                        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                            <div className="text-center">
                                <h5 className="font-bold">Д-р Анна Карафилоска</h5>
                                <p className="text-tiny uppercase font-bold text-white">Кардиолог</p>
                            </div>
                        </CardFooter>
                    </Card>
                </div>

                <div className="hover:cursor-pointer hover:scale-110 transition duration-500 cursor-pointer hover:z-50">
                    <Card isFooterBlurred className="w-full h-[400px] col-span-12 sm:col-span-5">
                        <div className="flex items-center justify-items-center h-full">
                            <span className="text-center w-full">
                                Person image
                            </span>
                        </div>

                        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                            <div className="text-center">
                                <h5 className="font-bold">Д-р Анна Карафилоска</h5>
                                <p className="text-tiny uppercase font-bold text-white">Кардиолог</p>
                            </div>
                        </CardFooter>
                    </Card>
                </div>

                <div className="hover:cursor-pointer hover:scale-110 transition duration-500 cursor-pointer hover:z-50">
                    <Card isFooterBlurred className="w-full h-[400px] col-span-12 sm:col-span-5">
                        <div className="flex items-center justify-items-center h-full">
                            <span className="text-center w-full">
                                Person image
                            </span>
                        </div>

                        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                            <div className="text-center">
                                <h5 className="font-bold">Д-р Анна Карафилоска</h5>
                                <p className="text-tiny uppercase font-bold text-white">Кардиолог</p>
                            </div>
                        </CardFooter>
                    </Card>
                </div>

                <div className="hover:cursor-pointer hover:scale-110 transition duration-500 cursor-pointer hover:z-50">
                    <Card isFooterBlurred className="w-full h-[400px] col-span-12 sm:col-span-5">
                        <div className="flex items-center justify-items-center h-full">
                            <span className="text-center w-full">
                                Person image
                            </span>
                        </div>

                        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                            <div className="text-center">
                                <h5 className="font-bold">Д-р Анна Карафилоска</h5>
                                <p className="text-tiny uppercase font-bold text-white">Кардиолог</p>
                            </div>
                        </CardFooter>
                    </Card>
                </div>

                <div></div>
            </div>

            <div className=" py-16">

            </div>
        </>
    )
}

export default Home;
