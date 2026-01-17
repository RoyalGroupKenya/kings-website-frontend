"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, ChevronDown, Search } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LocationsDropdownProps {
  groupedLocations: Record<string, string[]>
}

// Function to format location URL for SEO
const formatLocationUrl = (location: string) => {
  return `/location/${location
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase()
    .replace(/^-+|-+$/g, "")}`
}

export default function LocationsDropdown({ groupedLocations }: LocationsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Get the main regions (limit to top 4 plus "Other")
  const mainRegions = Object.keys(groupedLocations)
    .sort((a, b) => {
      // Sort by number of locations (descending)
      return groupedLocations[b].length - groupedLocations[a].length
    })
    .slice(0, 4)

  if (!mainRegions.includes("Other") && groupedLocations["Other"]) {
    mainRegions.push("Other")
  }

  // Filter locations based on search query
  const getFilteredLocations = (region: string) => {
    if (!searchQuery) return groupedLocations[region]

    return groupedLocations[region].filter((location) => location.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="px-4 py-2 text-sm font-medium rounded-full transition-colors text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary flex items-center gap-1"
        >
          <MapPin className="h-4 w-4 mr-1" />
          Locations
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[400px]  bg-white dark:bg-gray-900 rounded-xl shadow-xl border-none"
      >
        <div className="p-3 border-b border-gray-100 dark:border-gray-800">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="text"
              placeholder="Search locations..."
              className="w-full pl-9 py-2 text-sm bg-gray-50 dark:bg-gray-800 border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue={mainRegions[0]} className="w-full">
          <TabsList className="w-full justify-start px-3 py-2 bg-transparent border-b border-gray-100 dark:border-gray-800 overflow-x-auto no-scrollbar">
            {mainRegions.map((region) => (
              <TabsTrigger
                key={region}
                value={region}
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-3 py-2"
              >
                {region}
              </TabsTrigger>
            ))}
          </TabsList>

          {mainRegions.map((region) => (
            <TabsContent key={region} value={region} className="mt-0">
              <div className="max-h-[240px] overflow-y-auto p-3">
                {getFilteredLocations(region).length > 0 ? (
                  <div className="grid grid-cols-1 gap-1">
                    {getFilteredLocations(region).map((area) => {
                      // For areas in a region, we need to include the full location string
                      const fullLocation = region === "Other" ? area : `${area}, ${region}`
                      return (
                        <Link
                          key={area}
                          href={formatLocationUrl(fullLocation)}
                          className="flex items-center px-2 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                          onClick={() => setIsOpen(false)}
                        >
                          <MapPin className="h-3.5 w-3.5 mr-2 text-primary/70" />
                          {area}
                        </Link>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No locations found</p>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

