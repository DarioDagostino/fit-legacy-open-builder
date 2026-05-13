type FoodIconProps = {
  category?: string;
  name?: string;
  className?: string;
};

export function FoodIconRenderer({ category, name = '', className = 'w-6 h-6' }: FoodIconProps) {
  const normalizeFoodText = (value?: string) =>
    (value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  const lowercaseName = normalizeFoodText(name);
  const lowercaseCategory = normalizeFoodText(category);
  const path = '/frutas_verduras_arroz_fideos_oliva';
  const moreIconsPath = '/more_icons_for_all_food';

  const pickVariant = (basePath: string, variants: string[]) => {
    const index = lowercaseName.length % variants.length;
    return <img src={`${basePath}/${variants[index]}`} className={`${className} object-contain drop-shadow-sm`} alt={name || 'Food'} />;
  };

  if (lowercaseName.includes('leche') || lowercaseName.includes('milk')) {
    if (lowercaseName.includes('coco') || lowercaseName.includes('coconut')) {
      return <img src={`${moreIconsPath}/Coconut Milk\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Coconut Milk" />;
    }
    if (lowercaseName.includes('avena') || lowercaseName.includes('oat')) {
      return pickVariant(moreIconsPath, ['Oat Milk\.webp', 'Oat Milk-1\.webp', 'Oat Milk-2\.webp', 'Oat Milk-3\.webp']);
    }
    if (lowercaseName.includes('hemp') || lowercaseName.includes('canamo') || lowercaseName.includes('cÃ¡Ã±amo')) {
      return <img src={`${moreIconsPath}/Hemp Milk\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Hemp Milk" />;
    }
    return pickVariant(moreIconsPath, ['Glass Of Milk\.webp', 'Milk\.webp']);
  }

  if (lowercaseName.includes('jamon') || lowercaseName.includes('ham') || lowercaseName.includes('cerdo') || lowercaseName.includes('pork')) {
    return <img src="/meat/Ham\.webp" className={`${className} object-contain drop-shadow-sm`} alt="Ham" />;
  }
  if (lowercaseName.includes('cordero') || lowercaseName.includes('lamb')) {
    return <img src="/meat/Rack of Lamb\.webp" className={`${className} object-contain drop-shadow-sm`} alt="Lamb" />;
  }
  if (lowercaseName.includes('steak') || lowercaseName.includes('bife') || lowercaseName.includes('entrecote')) {
    return pickVariant('/meat', ['Steak\.webp', 'Steak-1\.webp']);
  }
  if (lowercaseName.includes('vaca') || lowercaseName.includes('beef') || lowercaseName.includes('lomo')) {
    return <img src="/meat/Beef\.webp" className={`${className} object-contain drop-shadow-sm`} alt="Beef" />;
  }
  if (lowercaseName.includes('carne') || lowercaseName.includes('meat')) {
    return <img src="/meat/Meat\.webp" className={`${className} object-contain drop-shadow-sm`} alt="Meat" />;
  }
  if (lowercaseName.includes('docena') || lowercaseName.includes('dozen')) {
    return <img src="/chicken_eggs/Dozen Eggs\.webp" className={`${className} object-contain drop-shadow-sm`} alt="Dozen Eggs" />;
  }
  if (lowercaseName.includes('huevo') || lowercaseName.includes('egg')) {
    if (lowercaseName.includes('frito') || lowercaseName.includes('sunny')) {
      return <img src="/chicken_eggs/Sunny Side Up Eggs\.webp" className={`${className} object-contain drop-shadow-sm`} alt="Fried Eggs" />;
    }
    return <img src="/chicken_eggs/Eggs\.webp" className={`${className} object-contain drop-shadow-sm`} alt="Eggs" />;
  }
  if (lowercaseName.includes('pollo') || lowercaseName.includes('chicken') || lowercaseName.includes('ave')) {
    return pickVariant('/chicken_eggs', ['Poultry Leg\.webp', 'Poultry Leg-1\.webp']);
  }
  if (lowercaseName.includes('pavo') || lowercaseName.includes('turkey')) {
    return <img src="/chicken_eggs/Thanksgiving\.webp" className={`${className} object-contain drop-shadow-sm`} alt="Turkey" />;
  }
  if (lowercaseName.includes('filete') || lowercaseName.includes('fillet')) {
    return pickVariant('/fish', ['Fish Fillet\.webp', 'Fish Fillet-1\.webp', 'Fish Fillet-2\.webp']);
  }
  if (lowercaseName.includes('pescado') || lowercaseName.includes('fish') || lowercaseName.includes('salmon') || lowercaseName.includes('atun') || lowercaseName.includes('tuna') || lowercaseCategory === 'fish') {
    return pickVariant('/fish', ['Dressed Fish\.webp', 'Dressed Fish-1\.webp', 'Dressed Fish-2\.webp']);
  }
  if (lowercaseName.includes('sushi')) {
    return <img src={`${moreIconsPath}/Sushi\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Sushi" />;
  }

  if (lowercaseName.includes('almendra') || lowercaseName.includes('almond')) {
    if (lowercaseName.includes('manteca') || lowercaseName.includes('butter')) {
      return <img src={`${moreIconsPath}/Almond Butter\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Almond Butter" />;
    }
    return <img src={`${moreIconsPath}/Almond\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Almond" />;
  }
  if (lowercaseName.includes('mani') || lowercaseName.includes('cacahuate') || lowercaseName.includes('cacahuete') || lowercaseName.includes('peanut')) {
    return <img src={`${moreIconsPath}/Peanut Butter\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Peanut Butter" />;
  }
  if (lowercaseName.includes('nuez') || lowercaseName.includes('nuts') || lowercaseName.includes('nut')) {
    if (lowercaseName.includes('brazil')) {
      return <img src={`${moreIconsPath}/Brazil Nut\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Brazil Nut" />;
    }
    return <img src={`${moreIconsPath}/Nutshell\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Nuts" />;
  }
  if (lowercaseName.includes('coco') || lowercaseName.includes('coconut')) {
    if (lowercaseName.includes('manteca') || lowercaseName.includes('butter')) {
      return <img src={`${moreIconsPath}/butter coconut\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Coconut Butter" />;
    }
    return <img src={`${moreIconsPath}/Coconut\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Coconut" />;
  }
  if (lowercaseName.includes('palta') || lowercaseName.includes('avocado') || lowercaseName.includes('aguacate')) {
    return <img src={`${path}/Avocado\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Avocado" />;
  }
  if (lowercaseName.includes('aceite') || lowercaseName.includes('oil') || lowercaseName.includes('oliva')) {
    return <img src={`${path}/Olive Oil Bottle\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Oil" />;
  }
  if (lowercaseName.includes('aceituna') || lowercaseName.includes('olive')) {
    return <img src={`${path}/Olive\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Olive" />;
  }

  if (lowercaseName.includes('fresa') || lowercaseName.includes('frutilla') || lowercaseName.includes('strawberry')) {
    return <img src={`${moreIconsPath}/Strawberry\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Strawberry" />;
  }
  if (lowercaseName.includes('blueberry') || lowercaseName.includes('arandano') || lowercaseName.includes('arandanos')) {
    return pickVariant(moreIconsPath, ['Blueberry\.webp', 'Blueberry-1\.webp']);
  }
  if (lowercaseName.includes('manzana') || lowercaseName.includes('apple')) {
    return <img src={`${path}/Apples  Plate\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Apple" />;
  }
  if (lowercaseName.includes('banana') || lowercaseName.includes('platano')) {
    if (lowercaseName.includes('mala') || lowercaseName.includes('podrida') || lowercaseName.includes('bad')) {
      return <img src={`${path}/Bad Banana\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Bad Banana" />;
    }
    return <img src={`${path}/Peeled Banana\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Banana" />;
  }
  if (lowercaseName.includes('sandia') || lowercaseName.includes('watermelon')) {
    return <img src={`${path}/Watermelon\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Watermelon" />;
  }
  if (lowercaseName.includes('kiwi')) {
    return <img src={`${path}/Kiwi Fruit\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Kiwi" />;
  }
  if (lowercaseName.includes('papaya')) {
    return <img src={`${path}/Papaya\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Papaya" />;
  }
  if (lowercaseName.includes('durazno') || lowercaseName.includes('peach')) {
    return <img src={`${path}/Peach\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Peach" />;
  }

  if (lowercaseName.includes('champ') || lowercaseName.includes('seta') || lowercaseName.includes('mushroom')) {
    return pickVariant(moreIconsPath, ['Mushroom\.webp', 'Mushroom-1\.webp']);
  }
  if (lowercaseName.includes('lechuga') || lowercaseName.includes('lettuce')) {
    return <img src={`${path}/Lettuce\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Lettuce" />;
  }
  if (lowercaseName.includes('repollo') || lowercaseName.includes('cabbage')) {
    return pickVariant(path, ['Cabbage\.webp', 'Cabbage-1\.webp']);
  }
  if (lowercaseName.includes('apio') || lowercaseName.includes('celery')) {
    return <img src={`${path}/Celery\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Celery" />;
  }
  if (lowercaseName.includes('rabanito') || lowercaseName.includes('rabano') || lowercaseName.includes('radish')) {
    return <img src={`${path}/Radish\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Radish" />;
  }

  if (lowercaseName.includes('cereal')) {
    return <img src={`${moreIconsPath}/Cereal\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Cereal" />;
  }
  if (lowercaseName.includes('avena') || lowercaseName.includes('porridge') || lowercaseName.includes('oatmeal')) {
    return pickVariant(moreIconsPath, ['Porridge\.webp', 'Porridge-1\.webp', 'Porridge-2\.webp']);
  }
  if (lowercaseName.includes('pancake') || lowercaseName.includes('panqueque')) {
    return <img src={`${moreIconsPath}/Pancakes\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Pancakes" />;
  }
  if (lowercaseName.includes('tostada') || lowercaseName.includes('french toast')) {
    return <img src={`${moreIconsPath}/French toast with strawberry and sparkles\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="French Toast" />;
  }
  if (lowercaseName.includes('arroz') || lowercaseName.includes('rice')) {
    if (lowercaseName.includes('curry')) {
      return <img src={`${path}/Curry Rice\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Curry Rice" />;
    }
    return pickVariant(path, ['Cooked Rice\.webp', 'Rice Bowl\.webp']);
  }
  if (lowercaseName.includes('fideo') || lowercaseName.includes('pasta') || lowercaseName.includes('noodle')) {
    return pickVariant(path, ['Noodles\.webp', 'Noodles-1\.webp']);
  }
  if (lowercaseName.includes('sandwich') || lowercaseName.includes('pan') || lowercaseName.includes('bread')) {
    return pickVariant(path, ['Sandwich\.webp', 'Sandwich-1\.webp']);
  }
  if (lowercaseName.includes('sano') || lowercaseName.includes('healthy')) {
    return <img src={`${moreIconsPath}/Healthy Eating\.webp`} className={`${className} object-contain drop-shadow-sm`} alt="Healthy Eating" />;
  }

  if (lowercaseCategory === 'protein' || lowercaseCategory === 'proteins') return <img src="/meat/Meat\.webp" className={`${className} object-contain drop-shadow-sm opacity-80`} alt="Protein" />;
  if (lowercaseCategory === 'fruit' || lowercaseCategory === 'fruits') return <img src={`${path}/Apples  Plate\.webp`} className={`${className} object-contain drop-shadow-sm opacity-80`} alt="Fruit" />;
  if (lowercaseCategory === 'vegetable' || lowercaseCategory === 'vegetables') return <img src={`${path}/Cabbage\.webp`} className={`${className} object-contain drop-shadow-sm opacity-80`} alt="Vegetable" />;
  if (lowercaseCategory === 'carbs') return <img src={`${path}/Sandwich\.webp`} className={`${className} object-contain drop-shadow-sm opacity-80`} alt="Carbs" />;
  if (lowercaseCategory === 'fats') return <img src={`${path}/Olive Oil Bottle\.webp`} className={`${className} object-contain drop-shadow-sm opacity-80`} alt="Fats" />;

  return <span className={`${className} flex items-center justify-center text-lg`}>ðŸ½ï¸</span>;
}
