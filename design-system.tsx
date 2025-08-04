"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DesignSystemExport() {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">X'Presso ALS - Design System</h1>
        <p className="text-gray-600">Complete design specifications for Figma recreation</p>
      </div>

      {/* Color Palette */}
      <Card>
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Primary Blues</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-50 border rounded"></div>
                  <span className="text-sm">#EFF6FF - Blue 50</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded"></div>
                  <span className="text-sm">#2563EB - Blue 600</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded"></div>
                  <span className="text-sm">#4F46E5 - Indigo 600</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Success/Progress</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-50 border rounded"></div>
                  <span className="text-sm">#F0FDF4 - Green 50</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded"></div>
                  <span className="text-sm">#22C55E - Green 500</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-600 rounded"></div>
                  <span className="text-sm">#059669 - Emerald 600</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Warning/Attention</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-50 border rounded"></div>
                  <span className="text-sm">#FEFCE8 - Yellow 50</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded"></div>
                  <span className="text-sm">#F97316 - Orange 500</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-500 rounded"></div>
                  <span className="text-sm">#EF4444 - Red 500</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Neutrals</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-50 border rounded"></div>
                  <span className="text-sm">#F9FAFB - Gray 50</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-600 rounded"></div>
                  <span className="text-sm">#4B5563 - Gray 600</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-900 rounded"></div>
                  <span className="text-sm">#111827 - Gray 900</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle>Typography Scale</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <h1 className="text-3xl font-bold">Heading 1 - 30px Bold</h1>
              <code className="text-sm text-gray-600">font-size: 30px, font-weight: 700</code>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Heading 2 - 24px Bold</h2>
              <code className="text-sm text-gray-600">font-size: 24px, font-weight: 700</code>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Heading 3 - 20px Semibold</h3>
              <code className="text-sm text-gray-600">font-size: 20px, font-weight: 600</code>
            </div>
            <div>
              <h4 className="text-lg font-medium">Heading 4 - 18px Medium</h4>
              <code className="text-sm text-gray-600">font-size: 18px, font-weight: 500</code>
            </div>
            <div>
              <p className="text-base">Body Text - 16px Regular</p>
              <code className="text-sm text-gray-600">font-size: 16px, font-weight: 400</code>
            </div>
            <div>
              <p className="text-sm">Small Text - 14px Regular</p>
              <code className="text-sm text-gray-600">font-size: 14px, font-weight: 400</code>
            </div>
            <div>
              <p className="text-xs">Caption - 12px Regular</p>
              <code className="text-sm text-gray-600">font-size: 12px, font-weight: 400</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spacing System */}
      <Card>
        <CardHeader>
          <CardTitle>Spacing System</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold">Padding/Margins</h4>
              <div className="space-y-1 text-sm">
                <div>4px - xs</div>
                <div>8px - sm</div>
                <div>12px - base</div>
                <div>16px - md</div>
                <div>20px - lg</div>
                <div>24px - xl</div>
                <div>32px - 2xl</div>
                <div>48px - 3xl</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Border Radius</h4>
              <div className="space-y-1 text-sm">
                <div>4px - sm</div>
                <div>6px - base</div>
                <div>8px - md</div>
                <div>12px - lg</div>
                <div>16px - xl</div>
                <div>50% - full (circles)</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Shadows</h4>
              <div className="space-y-2">
                <div className="p-2 bg-white shadow-sm border">
                  <span className="text-sm">Small Shadow</span>
                </div>
                <div className="p-2 bg-white shadow border">
                  <span className="text-sm">Medium Shadow</span>
                </div>
                <div className="p-2 bg-white shadow-lg border">
                  <span className="text-sm">Large Shadow</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Grid System</h4>
              <div className="space-y-1 text-sm">
                <div>12-column grid</div>
                <div>16px gutters</div>
                <div>Max width: 1280px</div>
                <div>Responsive breakpoints:</div>
                <div className="ml-2">
                  <div>sm: 640px</div>
                  <div>md: 768px</div>
                  <div>lg: 1024px</div>
                  <div>xl: 1280px</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Component Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Component Specifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Cards</h4>
              <div className="p-4 bg-white border rounded-lg shadow-sm">
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Background:</strong> #FFFFFF
                  </div>
                  <div>
                    <strong>Border:</strong> 1px solid #E5E7EB
                  </div>
                  <div>
                    <strong>Border Radius:</strong> 8px
                  </div>
                  <div>
                    <strong>Padding:</strong> 16px-24px
                  </div>
                  <div>
                    <strong>Shadow:</strong> 0 1px 3px rgba(0,0,0,0.1)
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Buttons</h4>
              <div className="space-y-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">
                  Primary Button
                </button>
                <div className="text-xs text-gray-600">Height: 40px, Padding: 16px 24px, Border-radius: 6px</div>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium">
                  Secondary Button
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Progress Bars</h4>
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <div className="text-xs text-gray-600">
                  Height: 8px, Background: #E5E7EB, Fill: #2563EB, Border-radius: 9999px
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Badges</h4>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Badge variant="secondary">Secondary Badge</Badge>
                  <Badge className="bg-green-100 text-green-700">Success Badge</Badge>
                </div>
                <div className="text-xs text-gray-600">Padding: 4px 8px, Font-size: 12px, Border-radius: 4px</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layout Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Layout Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Header</h4>
              <div className="text-sm space-y-1">
                <div>
                  <strong>Height:</strong> 64px
                </div>
                <div>
                  <strong>Background:</strong> #FFFFFF
                </div>
                <div>
                  <strong>Border Bottom:</strong> 1px solid #E5E7EB
                </div>
                <div>
                  <strong>Padding:</strong> 0 32px
                </div>
                <div>
                  <strong>Logo Size:</strong> 32px × 32px
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Main Content Area</h4>
              <div className="text-sm space-y-1">
                <div>
                  <strong>Max Width:</strong> 1280px
                </div>
                <div>
                  <strong>Padding:</strong> 32px
                </div>
                <div>
                  <strong>Background:</strong> Linear gradient from #EFF6FF to #E0E7FF
                </div>
                <div>
                  <strong>Grid:</strong> 3-column layout (2/3 main, 1/3 sidebar)
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Card Layouts</h4>
              <div className="text-sm space-y-1">
                <div>
                  <strong>Card Spacing:</strong> 24px between cards
                </div>
                <div>
                  <strong>Internal Padding:</strong> 24px
                </div>
                <div>
                  <strong>Header Padding:</strong> 24px 24px 16px 24px
                </div>
                <div>
                  <strong>Content Padding:</strong> 0 24px 24px 24px
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Icons Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Icon Library (Lucide React)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 text-center">
            {[
              "Brain",
              "Target",
              "TrendingUp",
              "Clock",
              "Users",
              "BookOpen",
              "Lightbulb",
              "Zap",
              "Play",
              "CheckCircle",
              "AlertCircle",
              "Star",
              "Award",
              "BarChart3",
              "Eye",
              "Puzzle",
              "ChevronRight",
            ].map((icon) => (
              <div key={icon} className="space-y-2">
                <div className="w-8 h-8 mx-auto bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs">📍</span>
                </div>
                <div className="text-xs">{icon}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <strong>Icon Size:</strong> 16px-24px standard, 32px for headers
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
