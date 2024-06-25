"use client"

import { MapPin, PhoneCall } from "lucide-react";
import { Button } from "./ui/button";
import { Popover,
         PopoverContent,
         PopoverTrigger
 } from "@/components/ui/popover";
import { useRouter } from "next/navigation";

const NavbarRoutes = () => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/address`);
  }

  return (
    <div className="flex gap-2">
      <div>
        {/* TO DO: SEARCH */}
      </div>
      <div>
        <Popover>
            <PopoverTrigger>
                <Button variant="ghost" >
                    <MapPin className="h-5 w-5"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent >
                <div className=" grid gap-2">
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Мы на картах:
                        </p>
                    </div>
                    <div className="flex-col">
                        <a onClick={onClick} className="flex gap-2 items-center hover:bg-slate-200 transition pt-1 pb-2 px-2 rounded-md cursor-pointer">
                            <p>
                                Курмангазы 70Б
                            </p>
                        </a>
                        <a href={`https://yandex.com/maps/-/CDvdjJmz`} className="flex gap-2 items-center hover:bg-slate-200 transition pt-1 pb-2 px-2 rounded-md cursor-pointer">
                            <p>
                                Яндекс Карты
                            </p>
                        </a>
                        <a href={`https://maps.app.goo.gl/pWSmmUwydV6qeomk7`} className="flex gap-2 items-center hover:bg-slate-200 transition pt-1 pb-2 px-2 rounded-md cursor-pointer">
                            <p>
                                Google Карты
                            </p>
                        </a>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
        <Popover>
            <PopoverTrigger>
                <Button variant="ghost" >
                    <PhoneCall className="h-5 w-5"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent >
                <div className=" grid gap-2">
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Наши контакты:
                        </p>
                    </div>
                    <div className="flex-col md:hidden">
                        <a href={`tel:${87023923222}`} className="flex gap-2 items-center hover:bg-slate-200 transition pt-1 pb-2 px-2 rounded-md">
                            <h3 className="text-md text-slate-800">Влад:</h3>
                            <p>
                                +7 702 392 3222
                            </p>
                        </a>
                        <a href={`tel:${87058707885}`} className="flex gap-2 items-center hover:bg-slate-200 transition pt-1 pb-2 px-2 rounded-md">
                            <h3 className="text-md text-slate-800">Макс:</h3>
                            <p>
                                +7 705 870 7885
                            </p>
                        </a>
                        <a href={`tel:${87077050852}`} className="flex gap-2 items-center hover:bg-slate-200 transition pt-1 pb-2 px-2 rounded-md">
                            <h3 className="text-md text-slate-800">Георгий:</h3>
                            <p>
                                +7 707 705 0852
                            </p>
                        </a>
                    </div>
                    <div className="flex-col hidden md:flex">
                        <div className="flex gap-2 items-center hover:bg-slate-200 transition pt-1 pb-2 px-2 rounded-md">
                            <h3 className="text-md text-slate-800">Влад:</h3>
                            <p>
                                +7 702 392 3222
                            </p>
                        </div>
                        <div className="flex gap-2 items-center hover:bg-slate-200 transition pt-1 pb-2 px-2 rounded-md">
                            <h3 className="text-md text-slate-800">Макс:</h3>
                            <p>
                                +7 705 870 7885
                            </p>
                        </div>
                        <div className="flex gap-2 items-center hover:bg-slate-200 transition pt-1 pb-2 px-2 rounded-md">
                            <h3 className="text-md text-slate-800">Георгий:</h3>
                            <p>
                                +7 707 705 0852
                            </p>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default NavbarRoutes;
