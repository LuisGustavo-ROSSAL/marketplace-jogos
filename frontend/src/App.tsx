import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { MarketplaceProvider } from './context/MarketplaceContext'
import { CollectionPage } from './pages/CollectionPage'
import { CreateListingPage } from './pages/CreateListingPage'
import { FavoritesPage } from './pages/FavoritesPage'
import { HomePage } from './pages/HomePage'
import { ListingDetailsPage } from './pages/ListingDetailsPage'
import { LoginPage } from './pages/LoginPage'
import { MessagesPage } from './pages/MessagesPage'
import { MyListingsPage } from './pages/MyListingsPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProfilePage } from './pages/ProfilePage'
import { ProfilesPage } from './pages/ProfilesPage'
import { SettingsPage } from './pages/SettingsPage'
import { SignupPage } from './pages/SignupPage'

export default function App() {
  return (
    <BrowserRouter>
      <MarketplaceProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="colecao" element={<CollectionPage />} />
            <Route path="anuncios/novo" element={<CreateListingPage />} />
            <Route path="anuncios/:id" element={<ListingDetailsPage />} />
            <Route path="meus-anuncios" element={<MyListingsPage />} />
            <Route path="favoritos" element={<FavoritesPage />} />
            <Route path="mensagens" element={<MessagesPage />} />
            <Route path="perfis" element={<ProfilesPage />} />
            <Route path="perfil" element={<ProfilePage />} />
            <Route path="entrar" element={<LoginPage />} />
            <Route path="cadastro" element={<SignupPage />} />
            <Route path="configuracoes" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </MarketplaceProvider>
    </BrowserRouter>
  )
}