const sampleListings = [
    {
      title: "Cozy Beachfront Cottage",
      description:
        "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
      image: {
        url : "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" ,
        filename : 'recentfile'
      },
      
      price: 1500,
      location: "Malibu",
      country: "United States",
      coordinates : [34.0381 ,118.6923],
      category : 'mountain'
    },
    {
      title: "Historic Villa in Tuscany",
      description:
        "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
      image:{
        url :  "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        filename : 'recentfile'
      },
      price: 2500,
      location: "Florence",
      country: "Italy",
      coordinates : [43.7696 , 11.2558],
      category : 'forest'
    },
    {
      title: "Secluded Treehouse Getaway",
      description:
        "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
      image: {
        url : "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        filename : 'recentfile'
      },

      price: 800,
      location: "Portland",
      country: "United States",
      coordinates : [45.5152 , 122.6784],
      category : 'hills'
     
    },
    {
      title: "Luxury Penthouse with City Views",
      description:
        "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
      image: {
        url : "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        filename : 'recentfile'
      },
      price: 3500,
      location: "Los Angeles",
      country: "United States",
      coordinates : [34.0549 , 118.2426],
      category : 'swim'
      
    },
    {
      title: "Ski-In/Ski-Out Chalet",
      description:
        "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
      image: {
        url :  "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        filename : 'recentfile'
      },
      price: 3000,
      location: "Verbier",
      country: "Switzerland",
      coordinates : [46.0961 , 7.2286],
      category : 'villa'
      
    },
    {
      title: "Safari Lodge in the Serengeti",
      description:
        "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
      image: {
        url : "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        filename : 'recentfile'
      },
 
      price: 4000,
      location: "Serengeti National Park",
      country: "Tanzania",
      coordinates : [2.3333 , 34.8333],
      category : 'warehouse'

    },
    {
      title: "Historic Canal House",
      description:
        "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
      image: {
        url : "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        filename : 'recentfile'
      },
      price: 1800,
      location: "Amsterdam",
      country: "Netherlands",
      coordinates : [52.3676 , 4.9041],
      category : 'city'

    },
    {
      title: "Private Island Retreat",
      description:
        "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
      image: {
        url : "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        filename : 'recentfile'
      },
      price: 10000,
      location: "Fiji",
      country: "Fiji",
      coordinates : [17.7134 , 178.0650],
      category : 'castle'

    },
    {
      title: "Charming Cottage in the Cotswolds",
      description:
        "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
      image: {
        url : "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        filename : 'recentfile'
      },
      price: 1200,
      location: "Cotswolds",
      country: "United Kingdom",
      coordinates : [51.7950,1.8839],
      category : 'boat'

    },
    {
      title: "Historic Brownstone in Boston",
      description:
        "Step back in time in this elegant historic brownstone located in the heart of Boston.",
      image: {
        url : "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        filename : 'recentfile'
      },
      price: 2200,
      location: "Boston",
      country: "United States",
      coordinates : [42.3601,71.0589]
    },
    {
      title: "Beachfront Bungalow in Bali",
      description:
        "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
      image: {
        url : "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        filename : 'recentfile'
      },
      price: 1800,
      location: "Bali",
      country: "Indonesia",
      coordinates : [8.4095 , 115.1889]
    },
    {
      title: "Art Deco Apartment in Miami",
      description:
        "Step into the glamour of the 1920s in this stylish Art Deco apartment in South Beach.",
      image: {
        url : "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        filename : 'recentfile'
      },
      price: 1600,
      location: "Miami",
      country: "United States",
      coordinates : [25.7617 , 80.1918]
    },
    {
      title: "Tropical Villa in Phuket",
      description:
        "Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.",
      image: {
        url : "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        filename : 'recentfile'
      },
      price: 3000,
      location: "Phuket",
      country: "Thailand",
      coordinates:[7.8804,98.3923]
    },
    {
      title: "Historic Castle in Scotland",
      description:
        "Live like royalty in this historic castle in the Scottish Highlands. Explore the rugged beauty of the area.",
      image: {
        url : "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        filename : 'recentfile'
      },
      price: 4000,
      location: "Scottish Highlands",
      country: "United Kingdom",
      coordinates : [57.4596,4.2264]
    },
    {
      title: "Desert Oasis in Dubai",
      description:
        "Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.",
      image: {
        url : "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        filename : 'recentfile'
      },
      price: 5000,
      location: "Dubai",
      country: "United Arab Emirates",
      coordinates : [25.2048 , 55.2708]
    },
    {
      title: "Historic Cottage in Charleston",
      description:
        "Experience the charm of historic Charleston in this beautifully restored cottage with a private garden.",
      image: {
        url : "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        filename : 'recentfile'
      },
      price: 1600,
      location: "Charleston",
      country: "United States",
      coordinates : [32.7765 , 79.9311]
    },
    {
      title: "Modern Apartment in Tokyo",
      description:
        "Explore the vibrant city of Tokyo from this modern and centrally located apartment.",
      image: {
        url : "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        filename : 'recentfile'
      },
      price: 2000,
      location: "Tokyo",
      country: "Japan",
      coordinates : [35.6764,139.6500]
    },
  ];
  
  module.exports = { data: sampleListings };