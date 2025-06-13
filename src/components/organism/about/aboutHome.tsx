import React from "react";
import { PointerHighlight } from "../../ui/pointer-highlight";
import FlowingMenu from "@/components/molecules/FlowingMenu/FlowingMenu";

const serviceItems = [
    { link: '#', text: 'UI/UX Designer', image: 'https://picsum.photos/600/400?random=1' },
    { link: '#', text: 'Product Designer', image: 'https://picsum.photos/600/400?random=2' },
    { link: '#', text: 'Frontend Developer', image: 'https://picsum.photos/600/400?random=3' },
    { link: '#', text: 'Framer Developer', image: 'https://picsum.photos/600/400?random=4' }
];

export default function AboutHome() {

    return (
        <div className="min-h-screen bg-gray-950">
            <div className="container mx-auto px-4 md:px-28 min-h-screen items-center justify-center">
                <div className="flex flex-col gap-20 w-full h-full py-10 md:py-20">
                    <div className="md:flex-1 flex-col gap-4 text-white">
                        <span className="text-xl">/ What Can I Do</span>
                        <div className="flex flex-col gap-4">
                            <h1 className="text-5xl">Create good solutions through</h1>
                            <PointerHighlight>
                                <span className="text-5xl px-4 py-4">the building of emotions.</span>
                            </PointerHighlight>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="md:flex-1 flex flex-col gap-4">
                            <span className="text-lg text-justify">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsa, eius illo pariatur eveniet facere reiciendis tenetur quae voluptatibus quos consequatur sapiente corporis saepe vitae placeat excepturi optio voluptatum! Optio ea blanditiis impedit? Veritatis, totam. Placeat voluptatem necessitatibus praesentium officiis maiores autem unde non eaque, culpa dolore nemo mollitia magnam est debitis earum totam quo maxime at reiciendis repudiandae harum minus aut vitae. Id saepe, distinctio explicabo rerum veniam fugit rem atque quod ex, non, iure enim eveniet optio libero porro et est dignissimos. Nihil suscipit atque officia quam hic ex, magnam neque quisquam, non culpa quidem maiores laborum praesentium.
                            </span>
                        </div>
                        <div className="md:flex-1 flex flex-col gap-4 h-80 overflow-hidden">
                            <FlowingMenu items={serviceItems} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}