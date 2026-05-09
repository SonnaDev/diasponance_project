export type Article = {
  slug: string
  emoji: string
  categorie: string
  titre: string
  resume: string
  date: string
  lecture: string
  color: string
  textColor: string
  contenu: string
}

export const articles: Article[] = [
  {
    slug: 'envoyer-argent-afrique',
    emoji: '✈️',
    categorie: 'Transferts',
    titre: 'Comment envoyer de l\'argent en Afrique sans perdre sur le taux de change',
    resume: 'Comparatif des meilleures solutions: Wave, Orange Money, Western Union, Wise.',
    date: '15 avril 2026',
    lecture: '5 min',
    color: '#ede9fe',
    textColor: '#7c3aed',
    contenu: `
## Le problème du taux de change

Chaque fois que vous envoyez de l'argent en Afrique, vous perdez une partie à cause des frais et du taux de change. Mais combien exactement? Et comment minimiser ces pertes?

## Comparatif des services

### Wave 🌊
Wave est devenu le service préféré des Sénégalais en France. Voici pourquoi:
- **Frais**: 0% sur les envois (oui, vraiment gratuit!)
- **Taux de change**: proche du taux officiel EUR/XOF
- **Délai**: instantané
- **Disponible**: Sénégal, Côte d'Ivoire, Mali, Cameroun

### Orange Money 📱
Orange Money est disponible dans 17 pays africains.
- **Frais**: 1-3% selon le montant
- **Taux**: légèrement en dessous du taux officiel
- **Délai**: quelques minutes
- **Disponible**: très large couverture Afrique

### Western Union 🏦
Le vétéran des transferts internationaux.
- **Frais**: 3-8% selon le montant et la destination
- **Taux**: souvent moins favorable
- **Délai**: instantané à 1-2 jours
- **Disponible**: partout dans le monde

### Wise (anciennement TransferWise) 💚
La solution la plus transparente.
- **Frais**: 0.5-1.5% (très bas)
- **Taux**: taux du marché réel
- **Délai**: 1-2 jours ouvrables
- **Disponible**: de plus en plus de pays africains

## Notre recommandation

Pour envoyer vers le Sénégal ou la Côte d'Ivoire: **Wave** sans hésitation.
Pour les autres pays: **Wise** pour le meilleur taux, **Orange Money** pour la rapidité.

## Astuce DiasporaFinance 💡

Utilisez notre convertisseur de devises intégré pour connaître le taux du jour avant chaque envoi. Ainsi vous savez exactement combien votre famille va recevoir.
    `
  },
  {
    slug: 'budget-diaspora',
    emoji: '💰',
    categorie: 'Budget',
    titre: 'La règle 50/30/20 adaptée à la diaspora africaine',
    resume: 'Comment gérer son budget quand on a des obligations familiales en Afrique?',
    date: '8 avril 2026',
    lecture: '7 min',
    color: '#dcfce7',
    textColor: '#16a34a',
    contenu: `
## La règle 50/30/20 classique

La règle budgétaire 50/30/20 dit que vous devriez allouer:
- **50%** de vos revenus aux besoins essentiels (loyer, nourriture, transport)
- **30%** aux envies (loisirs, restaurant, voyages)
- **20%** à l'épargne et aux dettes

Mais cette règle a été créée pour des personnes sans obligations familiales à l'étranger. Elle ne tient pas compte de notre réalité.

## La règle 50/20/20/10 pour la diaspora

Voici notre adaptation:

### 50% — Besoins essentiels en Europe
- Loyer et charges
- Nourriture et courses
- Transport (abonnement, carburant)
- Assurance santé
- Téléphone et internet

### 20% — Famille en Afrique
Cette catégorie est souvent ignorée dans les conseils budgétaires classiques. Pourtant, pour beaucoup d'entre nous, c'est une obligation morale et affective.
- Transferts réguliers (parents, frères et sœurs)
- Urgences familiales
- Participation aux événements (mariages, baptêmes, funérailles)

### 20% — Épargne personnelle
- Fonds d'urgence (3-6 mois de dépenses)
- Épargne pour les objectifs (billet retour, projet)
- Retraite

### 10% — Loisirs et bien-être
- Restaurants et sorties
- Loisirs et culture
- Petits plaisirs

## Comment s'y tenir?

Utilisez DiasporaFinance pour tracker chaque catégorie. Vous verrez immédiatement si vous dépassez votre budget famille ou si votre épargne est insuffisante.
    `
  },
  {
    slug: 'taux-eur-xof',
    emoji: '💱',
    categorie: 'Devises',
    titre: 'EUR/XOF: tout comprendre sur le Franc CFA',
    resume: 'Histoire, stabilité et tout ce que vous devez savoir avant d\'envoyer de l\'argent.',
    date: '1 avril 2026',
    lecture: '6 min',
    color: '#fef9c3',
    textColor: '#ca8a04',
    contenu: `
## Qu'est-ce que le Franc CFA?

Le Franc CFA (Communauté Financière Africaine) est la monnaie utilisée par 14 pays africains, dont le Sénégal, la Côte d'Ivoire, le Mali, le Burkina Faso, et d'autres.

Il existe deux zones CFA:
- **UEMOA** (Afrique de l'Ouest): XOF - Franc CFA Ouest-Africain
- **CEMAC** (Afrique Centrale): XAF - Franc CFA Afrique Centrale

## Le taux fixe avec l'Euro

Le Franc CFA est **fixé** à l'Euro depuis 1999:
- **1 EUR = 655.957 XOF** (taux officiel fixe)

C'est une des grandes particularités du Franc CFA. Contrairement au Dollar ou à la Livre Sterling, le taux EUR/XOF ne fluctue pas. C'est une stabilité précieuse pour planifier vos transferts.

## Pourquoi les services de transfert donnent des taux différents?

Si le taux officiel est fixe, pourquoi Wave vous donne 655 XOF et Western Union parfois 620 XOF?

La réponse: les frais sont cachés dans le taux de change. Un service qui prend "0% de frais" peut quand même gagner de l'argent en vous donnant un taux moins favorable que l'officiel.

## Comment vérifier si vous avez un bon taux?

Le taux officiel est **655.957 XOF pour 1 EUR**. Tout service qui vous donne moins que ça prend une marge sur le taux.

Avec DiasporaFinance, vous pouvez enregistrer le taux de chaque transfert et comparer au fil du temps.
    `
  },
  {
    slug: 'epargne-diaspora',
    emoji: '🎯',
    categorie: 'Épargne',
    titre: 'Épargner depuis l\'étranger: stratégies pour la diaspora africaine',
    resume: 'Comment mettre de l\'argent de côté tout en soutenant sa famille?',
    date: '25 mars 2026',
    lecture: '8 min',
    color: '#fee2e2',
    textColor: '#dc2626',
    contenu: `
## Le défi de l'épargne pour la diaspora

Épargner est difficile pour tout le monde. Mais pour les Africains à l'étranger, c'est encore plus complexe. Entre le loyer élevé en Europe, les transferts réguliers à la famille, et les imprévus, il reste souvent peu pour épargner.

Pourtant, épargner est essentiel. Pas seulement pour vous, mais aussi pour votre famille.

## Stratégie 1: L'épargne automatique

**Principe**: dès que votre salaire arrive, transférez automatiquement un montant fixe sur un compte épargne.

Ne comptez pas sur la volonté. Automatisez. Si vous attendez la fin du mois pour épargner "ce qui reste", il ne restera rien.

## Stratégie 2: Le fonds d'urgence d'abord

Avant tout autre objectif, constituez un fonds d'urgence de 3 mois de dépenses. Ce fonds vous protège des imprévus sans devoir demander de l'aide à votre famille en Afrique.

## Stratégie 3: Les objectifs concrets

Épargner "pour l'avenir" est trop vague. Créez des objectifs précis:
- **Billet retour Dakar**: 450€ d'ici 6 mois
- **Urgence famille**: 1000€ toujours disponibles
- **Formation professionnelle**: 800€ d'ici 1 an

DiasporaFinance vous aide à suivre chaque objectif avec une barre de progression.

## Stratégie 4: L'épargne pour la famille

Certains membres de la diaspora créent un "fonds famille" séparé de leur épargne personnelle. Ce fonds est dédié aux urgences familiales en Afrique, ce qui évite de puiser dans l'épargne personnelle.

## Conclusion

L'épargne diaspora demande discipline et organisation. Commencez petit — même 50€ par mois fait une différence. L'important est de commencer.
    `
  },
  {
    slug: 'wave-vs-orange-money',
    emoji: '📱',
    categorie: 'Comparatif',
    titre: 'Wave vs Orange Money vs Western Union: lequel choisir en 2026?',
    resume: 'Analyse complète des trois principales solutions de transfert d\'argent vers l\'Afrique.',
    date: '18 mars 2026',
    lecture: '10 min',
    color: '#e0f2fe',
    textColor: '#0369a1',
    contenu: `
## Le verdict rapide

| Service | Frais | Taux | Rapidité | Note |
|---------|-------|------|----------|------|
| Wave | 0% | Excellent | Instantané | ⭐⭐⭐⭐⭐ |
| Orange Money | 1-3% | Bon | Minutes | ⭐⭐⭐⭐ |
| Western Union | 3-8% | Moyen | Variable | ⭐⭐⭐ |

## Wave: le meilleur rapport qualité/prix

Wave est devenu incontournable pour les transferts vers l'Afrique de l'Ouest. Lancé au Sénégal en 2018, il a révolutionné les transferts d'argent avec ses frais à 0%.

**Points forts:**
- Aucun frais sur les envois
- Taux de change proche du taux officiel
- Application mobile très intuitive
- Instantané

**Limites:**
- Disponible dans seulement quelques pays (Sénégal, Côte d'Ivoire, Mali, Ouganda, Tanzanie, Cameroun)
- Nécessite un compte Wave du côté bénéficiaire

## Orange Money: la couverture maximale

Orange Money est présent dans 17 pays africains. C'est sa principale force.

**Points forts:**
- Couverture très large
- Réseau d'agents physiques important
- Disponible même sans smartphone

**Limites:**
- Frais entre 1% et 3%
- Taux moins favorable que Wave

## Western Union: le vétéran

Western Union existe depuis 1851. Sa force: il est disponible partout dans le monde.

**Points forts:**
- Disponible dans 200 pays
- Retrait en espèces possible
- Reconnaissance mondiale

**Limites:**
- Frais élevés (3-8%)
- Taux de change souvent défavorable
- Interface vieillissante

## Notre recommandation finale

**Pour Sénégal, Côte d'Ivoire, Mali**: Wave sans hésitation.
**Pour autres pays Afrique de l'Ouest**: Orange Money.
**Pour destinations hors Afrique subsaharienne**: Western Union ou Wise.
    `
  },
  {
    slug: 'impots-expatrie',
    emoji: '📋',
    categorie: 'Fiscalité',
    titre: 'Impôts en France: ce que la diaspora africaine doit savoir',
    resume: 'Résidence fiscale, déclaration des revenus, déductions possibles.',
    date: '10 mars 2026',
    lecture: '9 min',
    color: '#f3e8ff',
    textColor: '#7c3aed',
    contenu: `
## Êtes-vous résident fiscal en France?

La première question à se poser: êtes-vous considéré comme résident fiscal français? Si oui, vous devez déclarer TOUS vos revenus mondiaux en France.

Vous êtes résident fiscal français si:
- Vous avez votre foyer principal en France
- Vous exercez une activité professionnelle en France
- Vous avez le centre de vos intérêts économiques en France

## Ce que vous devez déclarer

En tant que résident fiscal français, vous devez déclarer:
- Vos salaires et revenus professionnels
- Vos revenus de placement (épargne, investissements)
- Vos revenus fonciers (loyers en France ET en Afrique)
- Les sommes reçues de l'étranger au-delà de certains seuils

## Les transferts vers l'Afrique

Bonne nouvelle: **les transferts d'argent vers votre famille ne sont généralement pas imposables**. Ce sont des dons familiaux, pas des revenus.

Cependant, si vous envoyez des montants importants (au-delà de 15.000€ par an à la même personne), il peut être judicieux de déclarer ces dons pour éviter tout problème.

## Les déductions possibles

Vous pouvez potentiellement déduire:
- Les pensions alimentaires versées à vos parents si vous êtes en mesure de prouver leur besoin
- Les frais de déplacement professionnels
- Les frais de formation professionnelle

## Notre conseil

La fiscalité est complexe et change régulièrement. Cet article est informatif, pas un conseil fiscal. Pour votre situation personnelle, consultez un comptable ou un conseiller fiscal.

DiasporaFinance vous aide à tracker vos revenus et dépenses pour faciliter votre déclaration.
    `
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}