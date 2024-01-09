class Vehicle {
    //rendelkezhet bizonyos tulajdonságokkal, mezőkkel -> 
    private _vehicleType: VehicleTypes; //private nem férhető hozzá példányon keresztül
    public brand: string;
    public type: string;
    public color: Colors;
    public wheelNumbers: number;
    public wingNumbers: number;
    public weight: number;

    set vehicleType(vt: VehicleTypes) {
        this._vehicleType = vt;
    }

    get vehicleType(): VehicleTypes { // vehicleTypes enum típus 
        return this._vehicleType;
    }

    constructor(vehicleType: VehicleTypes, brand: string, type: string, color: Colors, wheelNumbers: string, wingNumbers: string, weight: number = 100) {
        //ugy van értelme a constructornak, ha fogad paramétereket
        this._vehicleType = vehicleType;
        this.brand = brand;
        this.type = type;
        this.color = color;
        this.wheelNumbers = wheelNumbers;
        this.wingNumbers = wingNumbers;
        this.weight = weight;

    }
}


const car: Vehicle = new Vehicle(
    VehicleTypes.car, "BMW", "3", Colors.purple,
    4, 0, 1200
);

enum VehicleTypes {
    car = "autó",
    ship = "hajó",
    plane = "repülőgép",
    bicycle = "bicikli"
}

enum Colors {
    blue = "#3e9ecf",
    green = "#14db71",
    red = "#d42e00",
    purple = "#9e00ed",

}

const car: Vehicle = new Vehicle();//vehicle osztály másolata egy car nevezető változóban, akkor pontos, ha beírjuk, hogy egy vehicle típus
car.vehicleType = VehicleTypes.car; //nem tudjuk ezt mondani, ha private-ra van állítva a class-ban 
car.brand = "BMW";
car.type = "3";
car.color = Colors.purple; //amire itt megszeretnénk határozni arra csinálunk egy enum colors-ot 
car.wheelNumbers = 4;
car.wingNumbers = 0;
car.weight = 1200;


const car2: Vehicle = new Vehicle();

/*
Vannak a láthatósági módosítok (private, public) és a metódusoknak is lehetnek láthatósági módosítojuk 
és ez ugyanugy müködik, mint a mezők esetében 

Csinálik metódusokat a get Vehicletype után
*/

class Vehicle {
    //rendelkezhet bizonyos tulajdonságokkal, mezőkkel -> 
    protected _vehicleType: VehicleTypes; //private nem férhető hozzá példányon keresztül
    protected brand: string;
    protected type: string; //ha mezők protected vagy public, akkor örökölni fogja a Car osztály, amit erre csináltunk extend-vel
    protected color: Colors;
    protected wheelNumbers: number;
    protected wingNumbers: number;
    protected weight: number;

    set vehicleType(vt: VehicleTypes) {
        this._vehicleType = vt;
    }

    get vehicleType(): VehicleTypes { // vehicleTypes enum típus 
        return this._vehicleType;
    }

    public goForward(speed: number): void {
        /*ha public kivülről elérhető lesz a példányon keresztül, 
        ha private akkor nem (ha nem írunk láthatósági módosítot, akkor alapból publikus)
        */
        console.log(`A(z) ${this._vehicleType} típusú és ${this.brand} márkájú jármű ${speed} km/h-val megy előre.`);
    }
    public goBackward(speed: number): void {
        /*ha public kivülről elérhető lesz a példányon keresztül, 
        ha private akkor nem (ha nem írunk láthatósági módosítot, akkor alapból publikus)
        */
        console.log(`A(z) ${this._vehicleType} típusú és ${this.brand} márkájú jármű ${speed} km/h-val megy hátra.`)
    }
}

//lemásoltam felülről
const car: Vehicle = new Vehicle(
    VehicleTypes.car, "BMW", "3", Colors.purple,
    4, 0, 1200
);

/*
Meg lehet hívni a car példányból a goForward-ot és goBackward-ot is 
Ilyenkor a beállításoknak megfelelően fogja nekünk kiírni ezt a bizonyos szöveget 
this.vehicleType az jelen esetben az autó lesz, mert a car példányon keresztül hívjuk meg 
és a car az enum vehicleType-ban autó 
lefordítjuk és ha azt irjuk, hogy tsc -w object-oriented.ts 
ebben -w az watch és ugyanaz, mint a scss-nél, hogy folyamatosan figyeli a változásokat és, ha 
változott valami akkor lefordítja (be lehet állítani a taget-et is, hogy echmascript2022 legyen)
->
A(z) autó típusú és BMW márkájú jármű 60 km/h-val megy előre 
*/
car.goForward(60);
car.goBackward(20); //A(z) autó típusú és BMW márkájú jármű 20 km/h-val megy hátra

/*
Ez az egyik lényege, előnye az objektum-orientáltságnak, hogy ugyanazzal a kóddal 
különböző beállítások mellett más és más mező értékekkel másképpen viselkedik a kód
de bizonyos értelemben ugyanaz a logika szerint 
-> 
Csinálhatunk volna bármilyen más járműtípust és annak a példányából meghívva, ugyanazt csinálja az 
osztályban meghatározott goForward és goBackward függvény, csak más értékekkel 
*/

/**************************************************************************************************************************************/

//Öröklödés 

/*
Az öröklödésnek az a lényege, hogy készítünk egy másik osztályt (pl. itt class Car) és ha az extends kulcsszót 
használjuk a Vehicle-re, akkor gyakorlatilag a Car az összes publikus és védett mezőjét és metódusát örökölni 
fogja a Vehicle-nek 
-> 
Azt örökli, ami public vagy protected, a private-ot nem.

Van háromféle láthatósági módosítonk 
1. public
    * örökölhető 
    * hozzáférhető a példányon keresztül 
2. private
    * nem örökölhető 
    * nem férhető hozzá a példányon keresztül
3. protected
    * örökölhető 
    * nem férhető hozzá a példányon keresztül  

Ha class Vehicle-ben nem írtuk volna át a mezőket private-ról protected-re akkor nem örölölte volna meg 
a Car osztály a mezőket 
*/

class Car extends Vehicle {

}

const car2: Car = new Car(VehicleTypes.car, "Audi", "A4", Colors.red, 4, 0, 1500);
//létrehoztunk egy Car típusú car2 változót

/*
car2-ben meghívjuk a goForward-ot, akkor az pontosan ugyanugy fog müködni 
mitha a car-ból hívtuk volna meg, csak más adatokkal(azzal amit itt megadtunk a car2-ben -> Audi, a4, Colors.red stb.)
és ugyanugy müködik, mintha egy Vehicle példányból hívtuk volna meg, hiszen ezt egy Car osztány(ami örökölte a Vehicle 
osztány mezeit és metódusait, goForward, goBackward) egyik példányából hívtuk meg
-> 
Az a lényege az öröklödésnek, hogy már a Car osztály is rendelkezik azokkal a tulajdonságokkal és müködési 
formákkal, mint a Vehicle
*/
car2.goForward(100);//A(z) autó típusú és Audi márkájú jármű 100km/h-val megy előre

/*
Mi értelme az öröklödésnek, hiszen akkor csinálhatnánk végig vehicle példányokat 
-> 
A Car osztályt tovaább lehet fejleszteni a Vehicle-hőz képest 

pl. létrehozhatunk neki egy constructort
viszont ha contructort hozunk létre, hogy már örökölt valamitől, akkor
kénytelenek vagyunk meghívni a super() constructort 
*/

class Car extends Vehicle {

    constructor(vehicleType: VehicleTypes, brand: string, type: string, color: Colors, wheelNumbers: string, wingNumbers: string, weight: number) {
        /*
        Supert meg kell hívni ha az osztály, amiben van már ökökölt egy másik osztálytól,
        mert ez lesz az ősosztály konstruktora, tehát a Vehicle-é 
        Vehicle-nek a konstroktura vár mindenféle paramétereket pl.vehicleType, brand, color, stb.
        ugyhogy ezeket mi bekérjük a saját konstruktorunkban is 
        és ezeket átadjuk a szűlőosztály konstruktorának
        ->
        de mi értelme van beállítani a vehicleType-ot, minden esetben a constructorban a Carnál,
        amikor az minden esetben autó lesz, tehát van egy felesleges paraméter, amit nekünk nem kéne beállítanunk 
        hanem ez egy alapbeállítás kéne, hogy legyen, hiszen ez egy autó 
        -> 
        ilyenkor kitöröljük ezt a paramétert a felső constructorból és a super() constructorba, 
        vehicleTypes.car(már alapból car lesz) a többit meg közvetlenül átadjuk superContructornak 
        azaz gyakorlatilag a Vehicle constructornak 
        */
        super(vehicleTypes.car, brand, type, color, wheelNumbers, wingNumbers, weight);
        /*
        Ha ezeket átadtuk a supernek, ilyenkor az fog történni, hogy a Vehicle constructor-án 
        keresztül állítjuk be a különböző mezőknek az értékeit 
        ->
        tehát meghívjuk a super constructort és az nekünk gyakorlatilag a Vehicle osztályban 
        fogja nekünk beállítani a dolgokat, de ezeket mi örököljük Vehicle-től és ezért 
        benne lesz a Car-ban 
        */
    }

    /*
    felülírjuk az ősosztály(szűlőosztály) goForward metódusát 
    polimorfizmus -> felülírjuk a szűlőosztály metódusait 
    */
    public goForward(speed: number): void {
        console.log(`A(z) ${this.brand} márkájú és ${this.type} típusú autó ${speed} megy előre.`);
    }
}

/*
Innentől kezdve, elég eggyel kevesebb paramétert beállítani, mert a super constructor-ben 
meghatároztuk, hogy a VehicleTypes az mindig car lesz, hiszen a Car osztályt az csak autókra 
csináltuk 
*/
const car2: Car = new Car(
    "Audi", "A4", Colors.red, 4, 0, 1500 //VehicleTypes nem szükséges, hiszen azt már beleégettük ebbe az osztáyba(Car)
);
/*
VehicleTypes nem szükséges, hiszen azt már beleégettük ebbe az osztáyba(Car)
felülírtuk a constructor-t és ez a constructor eggyel kevesebb paramétert vár, mint a 
szűlőosztály constructora, ezért a példányban is eggyel kevesebb paramétert kell beírni

de a goForward metódus teljesen ugyanugy fog müködni kivéve ha felülírjuk!!!!!!!!!!!!!!!!!!!!!!!!!!!
Ha felülírjuk az ősosztály konstruktorát, akkor azt muszály meghívnunk a super() kulcsszóval 
*/
car2.goForward(100);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!polimorfizmus -> felülírjuk a szűlőosztály metódusait 
/*
Innentől kezdve, ha a Car típusból a goForward-ot, akkor most már nem azt írja, amikor még nem írtuk felül 
*/
car2.goForward(100);//A(z) Audi márkajú és A4 típusú autó 100 km/h-val megy előre

/*
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Az objektum-orientáltságnak van 3 szabálya 
    * egységbezárás
        Az egybe tartazó mezőket és metódusokat egybe gyüjtjük
    * öröklödés
    * polimorfizmus
*/
/*
egységbezárás 
-> 
Van a Vehicle osztályunk 
ami tartalmazza a járműveknek a fontosabb tulajdonságait (vehicleType, brand, type, color, stb.)
és ezt egy osztályba rakjuk bel, nem többe, mert ezek együvé tartoznak 
*/

/*********************************************************************************************************************************/

/*
Az interface egy megvalósítási sémát ad az osztálynak
*/

interface iCalculator {
    //arra szolgál, hogy milyen sémában kell létrehoznunk egy bizonyos osztályt -> class Calculator 
    add(a: number, b: number): number; //nincsen teste a metódusnak {}
    division(a: number, b: number): number;
    subtraction(a: number, b: number): number;
    multiplication(a: number, b: number): number;
    result:number;
}

/*
Az interface-től nem öröklünk, hanem implementálnk, tehát megvalósítjuk azt 
!!!!!!!!!!!!!!!!!!!!implements
*/ 

class Calculator implements iCalculator {
    result:number;
    /*
    Jelen esetben ennek nincs sok értelme, mert a return-vel már visszakapjuk az eredményt 
    az a lényeg, hogy mezőket is létre lehet így, hozni, fontos, hogy ide bekerüljön minden, amit megcsináltunk az interface-ben
    */
    /*
    Ennek kötelező a nem kidolgozott metódusokat kidolgozni, amiket megadtunk az iCalculator-ban,
    aszerint, amilyen szabályokat írtunk oda
    pl. az add-nek az a szabálya, hogy kell, hogy legyen két number paramétere és, hogy number visszatérési értéke legyen 
    */
    public add(a: number, b: number): number {
        /*
        itt kidolgozzuk és fontos, hogy public legyen, mert az interface metódusai, amiket így határozunk meg azok mind public-ok
        */
        return a + b;
    }
    public division(a: number, b: number): number {
        return a / b;
    }
    public subtraction(a: number, b: number): number {
        return a - b;
    }
    public multiplication(a: number, b: number): number {
        return a * b;
    }
}
/*
Amint kidolgoztuk az előre mehatározott szabályoknak megfelelően ezeket a metódusokat 
ugy már nem is írja, hogy bármi hibás lenne, mert ez már müködőképes -> ki van dolgozva 
*/

/****************************************************************************************************************************************/

//Absztrakt osztály

/*
Az osztály és az interface között helyezkedik el
*/

abstract class aAnimal {
    /*
    Abstract osztály ugyanazokat tartalmazhatja, mint egy osztály plusz ugynevezett abstract metódusokat 
    */
   protected species:string;
   protected subSpecies:string;
   protected color:string;
   protected legNumbers:number;
   protected wingNumbers:number;

   //rendelkezik abstract metódusokkal, amit majd ha öröklünk ettől az osztálytól azt ugyanugy ki kell dolgozni, mint az interface-k esetében
   abstract eat(food:string);
   abstract drink(drink:string);
   /*
   Ezek ugyanugy müködnek, mint az interface esetében csak ennek az abstract osztálynak 
   lehetnek nem abstract metódusai is és ezeket a sima metódusokat, minden osztály, 
   amit késöbb csinálink az aAnimal mintájára örökölni fogja, mert publikus és 
   ez mindegyiknél ugyanugy müködik 
   ->
   */
    doSomething() {
        console.log("The animal is doing something!");
  }

}

/*
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Az absztrakt osztályt nem lehet példányosítani
*/

//Ha meg próbálnánk egy aAnimal típusu monkey-t csinálni, ami egy aAnimal példány -> hibaüzenet 
const monkey:aAnimal = new aAnimal();//Cannot create an instance of an abstract class

/*
Az abstract class lényege -> közös tulajdonságai egyes osztályoknak 
*/

class Monkey extends aAnimal {
    /*
    Ilyenkor kötelessek vagyunk kidolgozni az eat és a drink metódusokat amit meghatároztunk sémáként 
    az abstarct aAnimals 
    */
   public eat(food:string) {
        console.log(`The monkey is eating ${food}.`);
   }

   public drink(drink:string) {
    console.log(`The monkey is drinking ${drink}.`);
}
}

/*
Még készíthetünk egy Dog osztályt is, ami szintén örököl az aAnimal-től 
Az abstarct metódusokkal egy sémát határoztunk meg, hogy kell kialakítani,
hogy kellene osztályt kialakítani ezekkel az abstract metódusokkal, 
viszont az egyikben a monkey a másikban a dog csniálja azokat a dolgokat, amiket 
meghatároztunk neki 
*/


class Dog extends aAnimal {
    
   public eat(food:string) {
        console.log(`The dog is eating ${food}.`);
   }

   public drink(drink:string) {
    console.log(`The dog is drinking ${drink}.`);
}
}

/*
Ha csinálunk egy példányt, akkor az lehet :Monkey is és :aAnimal is 
*/

const monkey:Monkey = new Monkey();
const dog:Dog = new Dog();

/*
Ha szeretnénk létrehozni egy állat listát, tömböt, 
akkor nem kell azt csinálnom, hogy 
*/
const dogs:Dog[] = [];
/*
ebbe csak dog-okat tudok tárolni monkey-t nem(igazából nem mond ellent, de ellent kéne, mert baromság, hogy monkey-t
tudunk tárolni ebben, mert nem kompatibilisek egymással)
/*
és akkor ebben csak kutyákat tudok tárolni 
hanem ->
*/
const animals:aAnimal[] = [
    monkey, dog
];
/*
normál esetben, azért jó ez, mert egységesen tudjuk kezelni az összes állatot
és ha egy ciklusban meg kell hívni az eat metódusát, akkor azt sokkal egyszerübb így megcsinálni, mintha 
külön lenne egy kutya, majom, macska stb.
-> 
Szóval jó, hogy létrehozunk egy ilyen aAnimal osztályt és abból származtatunk egy monkey-t egy dog-ot stb.
és ráadásul itt kötelezően ki kell dolgoznunk ezeket a metódusokat és mindegyik müködhet hasonlóféleképpen, 
de egy kicsit máshogyan 
*/

/*
Hangman játék objektum orientáltan 
*/

