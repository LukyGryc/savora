"use client";

import { CircleX, MenuIcon } from "lucide-react";
import { DrawerContent, DrawerHeader, DrawerTrigger, Drawer, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "../ui/drawer";
import Link from "next/link";
import LogoutButton from "../auth/LogoutButton";
import { Button } from "../ui/button";
import { useState } from "react";

const NavigationDrawer = () => {

    const [open, setOpen] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen} direction="right">
            <DrawerTrigger asChild>
                <button type="button" className="inline-flex items-center justify-center" aria-label="Open menu">
                  <MenuIcon className="h-5 w-5" aria-hidden />
                </button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="border-b border-white/10">
                    <DrawerTitle className="flex items-center justify-between">
                        Navigation
                        <button type="button" className="cursor-pointer rounded p-1 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-ring" onClick={() => setOpen(false)} aria-label="Close menu">
                          <CircleX className="h-5 w-5" aria-hidden />
                        </button>
                    </DrawerTitle>
                </DrawerHeader>


                <nav className="flex flex-col items-start p-4 gap-2 h-full" aria-label="Mobile navigation">

                    <Button asChild variant="ghost" className="border border-white/10 hover:bg-white/10">
                        <Link href="/calendar" onClick={() => setOpen(false)}>Calendar</Link>
                    </Button>

                    <Button asChild variant="ghost" className="border border-white/10 hover:bg-white/10">
                        <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
                    </Button>

                    <div className="w-full mt-20 flex justify-end h-full items-end">
                        <LogoutButton onClick={() => setOpen(false)} />
                    </div>

                </nav>


            </DrawerContent>
        </Drawer>
    )
}

export default NavigationDrawer