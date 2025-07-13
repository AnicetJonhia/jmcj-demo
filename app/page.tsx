import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Users, Target, TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">OrientPro</h1>
            </div>
            <Link href="/chat">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <MessageCircle className="h-4 w-4 mr-2" />
                Commencer le Chat
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Votre Assistant d'Orientation Professionnelle</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Découvrez votre voie professionnelle avec l'aide de notre assistant IA. Obtenez des conseils personnalisés
            pour votre carrière, vos études et vos projets.
          </p>
          <Link href="/chat">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
              <MessageCircle className="h-5 w-5 mr-2" />
              Démarrer une Conversation
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Conseils Personnalisés</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Recevez des recommandations adaptées à votre profil, vos compétences et vos aspirations
                professionnelles.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Orientation Ciblée</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Explorez différents secteurs d'activité et métiers qui correspondent à vos intérêts et compétences.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Évolution de Carrière</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Planifiez votre évolution professionnelle avec des stratégies concrètes et des étapes claires.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Prêt à découvrir votre potentiel ?</h3>
          <p className="text-gray-600 mb-6">
            Notre assistant IA est là pour vous accompagner dans vos choix d'orientation et de carrière.
          </p>
          <Link href="/chat">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Commencer maintenant
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 OrientPro. Assistant d'orientation professionnelle.</p>
        </div>
      </footer>
    </div>
  )
}
