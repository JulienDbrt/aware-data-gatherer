
import { Source, Item, GraphEdge } from '@/services/api';

export const mockSources: Source[] = [
  {
    id: 1,
    name: 'TechCrunch',
    url: 'https://techcrunch.com/feed/',
    type: 'rss',
    enabled: true,
    last_fetch: '2025-05-11T08:30:00Z',
  },
  {
    id: 2,
    name: 'Hacker News',
    url: 'https://news.ycombinator.com/rss',
    type: 'rss',
    enabled: true,
    last_fetch: '2025-05-11T08:15:00Z',
  },
  {
    id: 3,
    name: 'The Verge',
    url: 'https://www.theverge.com/rss/index.xml',
    type: 'rss',
    enabled: false,
    last_fetch: '2025-05-10T22:45:00Z',
  },
];

export const mockItems: Item[] = [
  {
    id: 1,
    source_id: 1,
    title: 'New AI breakthrough allows for more efficient natural language processing',
    link: 'https://example.com/ai-breakthrough',
    summary: 'Une équipe de chercheurs a développé un nouveau modèle de traitement du langage naturel qui surpasse les benchmarks actuels de 15%. Cette avancée significative repose sur une architecture d\'attention multi-niveaux qui réduit considérablement les coûts de calcul tout en améliorant la précision sur des tâches complexes. Les applications potentielles incluent des assistants virtuels plus performants et des outils de traduction plus précis.\n\nMots-clés: Intelligence Artificielle, Traitement du Langage Naturel, Modèles d\'Attention, Efficacité Computationnelle, Benchmarks',
    published_at: '2025-05-10T14:25:00Z',
  },
  {
    id: 2,
    source_id: 2,
    title: 'Tech startup raises $50M to revolutionize remote collaboration',
    link: 'https://example.com/startup-funding',
    summary: 'La startup Collab.io vient de lever 50 millions de dollars en série B pour développer sa plateforme de collaboration à distance. Leur technologie combine la réalité augmentée et des outils de communication en temps réel pour créer un environnement de travail virtuel immersif. Les investisseurs incluent Benchmark Capital et Sequoia. La société prévoit d\'utiliser ces fonds pour doubler son équipe et accélérer le développement de nouvelles fonctionnalités.\n\nMots-clés: Collab.io, Financement, Réalité Augmentée, Collaboration à Distance, Capital-risque',
    published_at: '2025-05-10T09:15:00Z',
  },
  {
    id: 3,
    source_id: 1,
    title: 'Renewable energy breakthrough could make solar panels twice as efficient',
    link: 'https://example.com/solar-breakthrough',
    summary: 'Des scientifiques du MIT ont développé un nouveau matériau photovoltaïque qui pourrait doubler l\'efficacité des panneaux solaires. Ce matériau innovant, à base de pérovskite modifiée, capture un spectre plus large de la lumière solaire et convertit l\'énergie avec un taux d\'efficacité record de 42%. Les premiers tests montrent une durabilité prometteuse, résolvant l\'un des principaux obstacles des technologies précédentes à base de pérovskite. La commercialisation est prévue d\'ici trois ans.\n\nMots-clés: Énergie Renouvelable, Panneaux Solaires, Pérovskite, MIT, Efficacité Énergétique',
    published_at: '2025-05-09T22:30:00Z',
  },
  {
    id: 4,
    source_id: 3,
    title: 'Quantum computing milestone: Error correction breakthrough announced',
    link: 'https://example.com/quantum-milestone',
    summary: 'IBM a annoncé une avancée majeure dans la correction d\'erreurs quantiques, un obstacle fondamental au développement d\'ordinateurs quantiques pratiques. Leur nouvelle approche topologique réduit le taux d\'erreur de 80%, permettant des calculs quantiques plus stables et durables. Cette percée pourrait accélérer considérablement le calendrier de développement de systèmes quantiques utilisables à grande échelle. Les experts du domaine qualifient cette innovation de "moment Kitaev" en référence au physicien théoricien.\n\nMots-clés: Informatique Quantique, Correction d\'Erreurs, IBM, Topologie Quantique, Innovation Technologique',
    published_at: '2025-05-09T16:40:00Z',
  },
  {
    id: 5,
    source_id: 2,
    title: 'Privacy-focused search engine sees 200% growth amid data concerns',
    link: 'https://example.com/privacy-search-growth',
    summary: 'Le moteur de recherche respectueux de la vie privée DuckDuckGo a enregistré une croissance de 200% de son utilisation au cours de l\'année dernière. Cette augmentation spectaculaire coïncide avec de nouvelles révélations sur les pratiques de collecte de données des grandes entreprises technologiques. L\'entreprise rapporte désormais plus de 50 millions de recherches quotidiennes. Son modèle économique basé sur des publicités contextuelles plutôt que sur le profilage des utilisateurs semble gagner en popularité auprès des consommateurs de plus en plus soucieux de leur vie privée.\n\nMots-clés: DuckDuckGo, Confidentialité, Moteurs de Recherche, Croissance, Publicité Contextuelle',
    published_at: '2025-05-08T11:20:00Z',
  },
];

export const mockGraphEdges: GraphEdge[] = [
  {
    source: 'Intelligence Artificielle',
    target: 'Traitement du Langage Naturel',
    relation: 'co-mentioned',
  },
  {
    source: 'Intelligence Artificielle',
    target: 'Modèles d\'Attention',
    relation: 'co-mentioned',
  },
  {
    source: 'Traitement du Langage Naturel',
    target: 'Benchmarks',
    relation: 'co-mentioned',
  },
  {
    source: 'Collab.io',
    target: 'Réalité Augmentée',
    relation: 'co-mentioned',
  },
  {
    source: 'Réalité Augmentée',
    target: 'Collaboration à Distance',
    relation: 'co-mentioned',
  },
  {
    source: 'Collab.io',
    target: 'Capital-risque',
    relation: 'co-mentioned',
  },
  {
    source: 'Énergie Renouvelable',
    target: 'Panneaux Solaires',
    relation: 'co-mentioned',
  },
  {
    source: 'Panneaux Solaires',
    target: 'Pérovskite',
    relation: 'co-mentioned',
  },
  {
    source: 'MIT',
    target: 'Pérovskite',
    relation: 'co-mentioned',
  },
  {
    source: 'Informatique Quantique',
    target: 'Correction d\'Erreurs',
    relation: 'co-mentioned',
  },
  {
    source: 'IBM',
    target: 'Informatique Quantique',
    relation: 'co-mentioned',
  },
  {
    source: 'Topologie Quantique',
    target: 'Innovation Technologique',
    relation: 'co-mentioned',
  },
  {
    source: 'DuckDuckGo',
    target: 'Confidentialité',
    relation: 'co-mentioned',
  },
  {
    source: 'Moteurs de Recherche',
    target: 'Publicité Contextuelle',
    relation: 'co-mentioned',
  },
];
