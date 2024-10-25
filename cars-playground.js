use('nttdata');

db.cars.insertMany([
  {
    brand: 'Tesla',
    model: 'Model S',
    engine: {
      type: 'Electric',
      horsepower: 670,
    },
    price: 79999,
    color: 'Red',
    features: ['Autopilot', 'Ludicrous Mode', 'Full Self-Driving'],
    details: {
      weight: 2100,
      dimensions: {
        length: 4970,
        width: 1964,
        height: 1445,
      },
      warranty_years: 4,
      warranty_km: 80000,
    },
  },
  {
    brand: 'Ford',
    model: 'Mustang GT',
    engine: {
      type: 'V8',
      horsepower: 450,
    },
    price: 55000,
    color: 'Blue',
    features: ['Track Mode', 'Launch Control'],
    details: {
      weight: 1720,
      dimensions: {
        length: 4789,
        width: 1915,
        height: 1381,
      },
      warranty_years: 3,
      warranty_km: 60000,
    },
  },
  {
    brand: 'Toyota',
    model: 'Corolla',
    engine: {
      type: 'Hybrid',
      horsepower: 121,
    },
    price: 24000,
    color: 'White',
    features: ['Adaptive Cruise Control', 'Lane Keeping Assist'],
    details: {
      weight: 1385,
      dimensions: {
        length: 4630,
        width: 1780,
        height: 1435,
      },
      warranty_years: 5,
      warranty_km: 100000,
    },
  },
  {
    brand: 'BMW',
    model: 'X5',
    engine: {
      type: 'V6',
      horsepower: 335,
    },
    price: 65000,
    color: 'Black',
    features: ['Panoramic Roof', 'Heated Seats', 'Adaptive Suspension'],
    details: {
      weight: 2275,
      dimensions: {
        length: 4922,
        width: 2004,
        height: 1745,
      },
      warranty_years: 4,
      warranty_km: 80000,
    },
  },
  {
    brand: 'Mercedes-Benz',
    model: 'E-Class',
    engine: {
      type: 'Inline-4 Turbo',
      horsepower: 255,
    },
    price: 62000,
    color: 'Silver',
    features: ['Ambient Lighting', 'Digital Cockpit', 'Air Suspension'],
    details: {
      weight: 1820,
      dimensions: {
        length: 4923,
        width: 1852,
        height: 1460,
      },
      warranty_years: 4,
      warranty_km: 80000,
    },
  },
]);

// 1. Realiza una búsqueda de todos los autos de la marca "Ford".
db.cars.find({ brand: 'Ford' });

// 2. Encuentra todos los autos que tengan la característica "Autopilot".
db.cars.find({ features: { $in: ['Autopilot'] } });

// 3. Busca todos los autos cuyo precio sea mayor a 50,000.
db.cars.find({ price: { $gt: 50000 } });

// 4. Realiza una búsqueda mostrando solo la marca, el modelo y el precio.
db.cars.find({}, { brand: 1, model: 1, price: 1, _id: 0 });

// 5. Encuentra todos los autos con una potencia de motor superior a 300 caballos de fuerza.
db.cars.find({ 'engine.horsepower': { $gt: 300 } });

// 6. Actualiza el Tesla Model S para agregar la característica "Heated Steering Wheel".
db.cars.updateOne(
  { model: 'Model S', brand: 'Tesla' },
  { $push: { features: 'Heated Steering Wheel' } }
);

// 7. Elimina todos los autos cuyo precio sea menor a $25,000.
db.cars.deleteMany({ price: { $lt: 25000 } });

// 8. Crea un índice para el campo brand para optimizar las consultas que filtran por marca.
db.cars.createIndex({ brand: 1 }, { unique: 1 });

// 9. Usa aggregate para agrupar los autos por el tipo de motor y calcular el promedio de precio para cada tipo.
db.cars.aggregate([
  {
    $group: {
      _id: '$engine.type',
      avgPrice: { $avg: '$price' },
    },
  },
]);

// 10. Inserta los cinco autos en la colección cars.
db.cars.insertMany([
  {
    brand: 'Audi',
    model: 'A4',
    engine: { type: 'V6', horsepower: 320 },
    price: 45000,
    color: 'Grey',
    features: ['Leather Seats', 'Sunroof'],
    details: {
      weight: 1600,
      dimensions: {
        length: 4762,
        width: 1847,
        height: 1428,
      },
    },
  },
  {
    brand: 'Audi',
    model: 'Q5',
    engine: { type: 'V6', horsepower: 349 },
    price: 53000,
    color: 'White',
    features: ['Leather Seats', 'Panoramic Roof'],
    details: {
      weight: 1900,
      dimensions: {
        length: 4681,
        width: 1893,
        height: 1659,
      },
    },
  },
  {
    brand: 'Chevrolet',
    model: 'Corvette Stingray',
    engine: { type: 'V8', horsepower: 490 },
    price: 65000,
    color: 'Red',
    features: ['Performance Exhaust', 'Magnetic Ride Control'],
    details: {
      weight: 1527,
      dimensions: {
        length: 4630,
        width: 1968,
        height: 1234,
      },
    },
  },
  {
    brand: 'Chevrolet',
    model: 'Camaro ZL1',
    engine: { type: 'V8', horsepower: 650 },
    price: 65000,
    color: 'Black',
    features: ['Performance Data Recorder', 'Launch Control'],
    details: {
      weight: 1770,
      dimensions: {
        length: 4784,
        width: 1934,
        height: 1349,
      },
    },
  },
  {
    brand: 'Ford Raptor',
    model: 'F-150 Raptor',
    engine: { type: 'V6', horsepower: 450 },
    price: 55000,
    color: 'Blue',
    features: ['Off-Road Fox Racing Shox', 'Trail Control'],
    details: {
      weight: 2500,
      dimensions: {
        length: 5890,
        width: 2180,
        height: 1976,
      },
    },
  },
]);
// 11. Realiza una consulta para buscar autos de la marca "Audi" y mostrar solo el modelo y el precio.
db.cars.find({ brand: 'Audi' }, { model: 1, price: 1, _id: 0 });

// 12. Muestra todos los autos disponibles en la colección cars.
db.cars.find({});

// 13. Encuentra todos los autos cuyo precio sea igual a $45,000.
db.cars.find({ price: 45000 });

// 14. Busca autos que sean de la marca "Toyota" o tengan un precio menor a $30,000.
db.cars.find({
  $or: [{ brand: 'Toyota' }, { price: { $lt: 30000 } }],
});

// 15. Actualiza todos los autos de la marca "BMW" para que su precio aumente en $5,000.
db.cars.updateMany({ brand: 'BMW' }, { $inc: { price: 5000 } });

// 16. Elimina todos los autos que tienen la característica "Launch Control".
db.cars.deleteMany({ features: { $in: ['Launch Control'] } });

// 17. Realiza una consulta para buscar autos de la marca "Mercedes-Benz", y muestra solo el modelo y el precio, ordenando los resultados por precio de forma ascendente.
db.cars.find({ brand: 'Mercedes-Benz' }, { model: 1, price: 1, _id: 0 }).sort({
  price: 1,
});

// 18. Busca todos los autos que tengan tanto "Autopilot" como "Full Self-Driving" en sus características.
db.cars.find({ features: { $all: ['Autopilot', 'Full Self-Driving'] } });

// 19. Realiza una consulta que cuente cuántos autos hay cuyo motor sea "Hybrid".
db.cars.countDocuments({ 'engine.type': 'Hybrid' });

// 20. Usa aggregate para agrupar los autos en tres categorías de precio: menores a $30,000, entre $30,000 y $60,000, y mayores a $60,000, y muestra cuántos autos hay en cada categoría.
db.cars.aggregate([
  {
    $group: {
      _id: {
        $cond: [
          { $lt: ['$price', 30000] },
          'Less than $30,000',
          {
            $cond: [
              { $lt: ['$price', 60000] },
              'Between $30,000 and $60,000',
              'More than $60,000',
            ],
          },
        ],
      },
      count: { $sum: 1 },
    },
  },
]);

// 21. Encuentra autos cuyo motor tenga más de 300 caballos de fuerza y que también tengan una garantía de más de 4 años.
db.cars.find({
  'engine.horsepower': { $gt: 300 },
  'details.warranty_years': { $gt: 4 },
});

// 22. Actualiza el documento del Tesla Model S para cambiar el peso del auto a 2,200 kg.
db.cars.updateOne({ model: 'Model S' }, { $set: { 'details.weight': 2200 } });

// 23. Crea un índice en el campo price para mejorar la eficiencia de las consultas que filtran por precio.
db.cars.createIndex({ price: 1 });

// 24. Después de crear el índice en el campo price, realiza una consulta que busque autos cuyo precio esté entre $40,000 y $80,000, y usa la función explain() para verificar si el índice está siendo utilizado.
db.cars.find({ price: { $gte: 40000, $lte: 80000 } }).explain();

// 25. Elimina el índice creado anteriormente en el campo price.
db.cars.dropIndex('price_1');

// 26. Encuentra todos los autos que tengan más de dos características en su array de features.
db.cars.find({ $where: 'this.features.length > 2' });
