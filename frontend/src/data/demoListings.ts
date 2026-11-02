import type { Listing } from '../types/listing'

export const demoListings: Listing[] = [
  { id: 1, name: 'Nintendo 3DS Aqua Blue', price: 200, status: 'Disponível', emoji: '🎮', color: '#b8e4ed', condition: 'Muito bom', year: '2011', description: 'Console portátil em ótimo estado, com carregador original.', included: ['Console', 'Carregador'] },
  { id: 2, name: 'Super Nintendo completo', price: 1000, status: 'Vendido', emoji: '🕹️', color: '#e8d7bd', condition: 'Bom', year: '1990', description: 'Edição clássica acompanhada de controle e cartuchos.', included: ['Console', 'Controle', '2 jogos'] },
  { id: 3, name: 'Atari 2600 + joystick', price: 800, status: 'Disponível', emoji: '🎛️', color: '#e8c99e', condition: 'Bom', year: '1977', description: 'Clássico funcionando. Acompanha joystick e fonte.', included: ['Console', 'Joystick', 'Fonte'] },
  { id: 4, name: 'PlayStation 1 Slim', price: 350, status: 'Vendido', emoji: '🎮', color: '#dedee0', condition: 'Muito bom', year: '2000', description: 'PlayStation compacto com dois controles e cabos.', included: ['Console', '2 controles', 'Cabos'] },
  { id: 5, name: 'Mega Drive 3', price: 450, status: 'Disponível', emoji: '🕹️', color: '#d8dced', condition: 'Bom', year: '1998', description: 'Console revisado, pronto para voltar à coleção.', included: ['Console', 'Controle'] },
  { id: 6, name: 'PlayStation 2', price: 500, status: 'Disponível', emoji: '🎮', color: '#d1dce9', condition: 'Bom', year: '2000', description: 'Modelo preto com controle original e memory card.', included: ['Console', 'Controle', 'Memory card'] },
  { id: 7, name: 'Game Boy Advance SP', price: 380, status: 'Disponível', emoji: '🎮', color: '#e9c5c6', condition: 'Muito bom', year: '2003', description: 'Portátil dobrável com tela iluminada.', included: ['Console', 'Carregador'] },
  { id: 8, name: 'PlayStation 2 Slim', price: 420, status: 'Disponível', emoji: '🎮', color: '#d5d6dc', condition: 'Bom', year: '2004', description: 'Console slim acompanhado de controle e cabos.', included: ['Console', 'Controle', 'Cabos'] },
]