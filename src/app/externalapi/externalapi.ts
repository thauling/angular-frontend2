// export interface Externalapi {
//     diet: string;
//     health: string;
//     cuisineType: string;
//     mealType: string;
//     dishType: string
// }

export interface Externalapi {
    term: string;
    dish: '' | 'Starter' | 'Main course' | 'Desserts';
    diet: '' |'balanced' | 'high-protein' | 'low-carb' | 'low-fat' | 'low-sodium';
    health: '' |'alcohol-free' | 'egg-free' | 'dairy-free' | 'gluten-free' | 'kosher' | 'peanut-free';
    cuisine: '' |'American' | 'Asian' | 'British' | 'Caribbean' | 'Central Europe' | 'Chinese' | 'Eastern Europe' | 'French' | 'Indian' | 'Italian' | 'Japanese' | 'Kosher' |
     'Mediterranian' | 'Mexican' | 'Middle Eastern' | 'Nordic' | 'South American' | 'South East Asian'
}

