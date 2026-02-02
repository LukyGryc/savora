import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = () => {

    return (
        <div className="bg-bg-primary flex-1 py-10">
            <div className="flex-col xl:flex-row gap-10 flex mx-auto w-full justify-center items-center">
                <Card className="w-[40%]">
                    <CardHeader>
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="aspect-video w-full" />
                    </CardContent>
                </Card>
                <Card className="w-[40%]">
                    <CardHeader>
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="aspect-video w-full" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )

}

export default loading