import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });

    // 1. Seed Categories
    const categoriesToSeed = [
      { name: 'Luxury Villa', slug: 'villa' },
      { name: 'Boutique Resort', slug: 'resort' },
      { name: 'Sky Apartment / Penthouse', slug: 'apartment' },
    ];

    const seededCategories = [];
    for (const cat of categoriesToSeed) {
      const existing = await payload.find({
        collection: 'project-categories',
        where: { slug: { equals: cat.slug } },
        limit: 1,
      });

      if (existing.docs.length > 0) {
        seededCategories.push(existing.docs[0]);
      } else {
        const doc = await payload.create({
          collection: 'project-categories',
          data: cat,
        });
        seededCategories.push(doc);
      }
    }

    // 2. Seed Locations
    const locationsToSeed = [
      { name: 'Coorg', slug: 'coorg' },
      { name: 'Goa', slug: 'goa' },
      { name: 'Bangalore', slug: 'bangalore' },
    ];

    const seededLocations = [];
    for (const loc of locationsToSeed) {
      const existing = await payload.find({
        collection: 'locations',
        where: { slug: { equals: loc.slug } },
        limit: 1,
      });

      if (existing.docs.length > 0) {
        seededLocations.push(existing.docs[0]);
      } else {
        const doc = await payload.create({
          collection: 'locations',
          data: loc,
        });
        seededLocations.push(doc);
      }
    }

    // Helper map
    const catMap = Object.fromEntries(seededCategories.map((c) => [c.slug, c.id]));
    const locMap = Object.fromEntries(seededLocations.map((l) => [l.slug, l.id]));

    // 3. Seed Projects
    const projectsToSeed = [
      {
        title: 'AARDE Coffee Hill Estate',
        slug: 'coffee-hill-estate',
        price: 'Rs. 6.5 Cr onwards',
        description: 'An ultra-luxury residential retreat nestled amidst private shade-grown coffee plantations in the highlands of Coorg. Features local stone masonry, infinity lap pools, and private estate access.',
        category: [catMap['villa']],
        location: locMap['coorg'],
        heroImageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
        amenities: {
          heading: 'Curated Coffee Estate Amenities',
          subheading: 'Premium services crafted to complement the quiet highlands lifestyle.',
          items: [
            { title: 'Infinity Sky Pool', description: 'A heated infinity-edge swimming pool overlooking the plantation valleys.', icon: '🏊‍♂️' },
            { title: 'Bespoke Wellness Spa', description: 'Traditional Ayurvedic and holistic therapy rooms.', icon: '🌿' },
            { title: 'Private Helipad', description: 'On-site helicopter landing zone with clearance services.', icon: '🚁' },
            { title: 'Coffee Tasting Lounge', description: 'Sample signature single-origin estate roasts brewed fresh.', icon: '☕' },
          ],
        },
        gallery: {
          heading: 'Estate Photo Gallery',
          subheading: 'A walkthrough of local architectural masonry and landscape aesthetics.',
          images: [
            { imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', caption: 'Signature stone facade', isVideo: false },
            { videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-with-swimming-pool-41655-large.mp4', caption: 'Infinity Pool Drone Walkthrough', isVideo: true },
            { imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', caption: 'Private pool deck sunset', isVideo: false },
            { imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', caption: 'Veranda lounge', isVideo: false },
          ],
        },
        reviews: {
          heading: 'Resident Experiences',
          subheading: 'What property owners have to say about Coorg estate living.',
          items: [
            { author: 'Alistair & Evelyn Vane', role: 'Villa 14 Owners', quote: 'Waking up to the morning mist over the coffee hills with total privacy has redefined our definition of luxury.', rating: 5 },
            { author: 'Priya Sharma', role: 'Weekend Resident', quote: 'The craftsmanship and integration with Coorg ecology is truly a dream.', rating: 5 },
          ],
        },
        locationMap: {
          heading: 'Highlands Location',
          address: 'AARDE Coffee Hill Estates, Madikeri, Coorg, Karnataka - 571201',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124838.7495029311!2d75.6548545805561!3d12.411130397576558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5aa1459f375bb%3A0xe21287c9751e18d6!2sMadikeri%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
          latitude: 12.4244,
          longitude: 75.7382,
          nearbyPlaces: [
            { name: 'Coorg Golf Links', distance: '12 mins drive' },
            { name: 'Abbey Waterfalls', distance: '25 mins drive' },
            { name: 'Kannur Airport (CNN)', distance: '90 mins drive' },
          ],
        },
      },
      {
        title: 'AARDE Azure Cove Residences',
        slug: 'azure-cove-residences',
        price: 'Rs. 8.2 Cr onwards',
        description: 'A collection of curated oceanfront villas offering direct beach access, private yacht slips, and signature Mediterranean architectural themes in South Goa.',
        category: [catMap['villa'], catMap['resort']],
        location: locMap['goa'],
        heroImageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
        amenities: {
          heading: 'Coastal Living Perks',
          subheading: 'Sea-centric features for resort lifestyle lovers.',
          items: [
            { title: 'Yacht Slips', description: 'Private docks matching luxury vessels up to 60ft.', icon: '🛥️' },
            { title: 'Infinity Deck Bistro', description: 'Daily organic seafood dining over matching ocean views.', icon: '🦞' },
            { title: 'Sunset Wellness Deck', description: 'Serene yoga and meditation decks right on the sand.', icon: '🧘‍♀️' },
          ],
        },
        gallery: {
          heading: 'Beachfront Gallery',
          subheading: 'Take a virtual stroll across premium ocean vistas.',
          images: [
            { imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', caption: 'Direct beach deck access' },
            { imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80', caption: 'Ocean view suite bedroom' },
          ],
        },
        reviews: {
          heading: 'Owner Stories',
          subheading: 'Testimonials from Goa cove residency owners.',
          items: [
            { author: 'Vikram Aditya', role: 'Azure Villa 03 Owner', quote: 'Living steps from pristine Goa beaches with 5-star resort maintenance is unparalleled value.', rating: 5 },
          ],
        },
        locationMap: {
          heading: 'Cove Geography',
          address: 'AARDE Azure Cove, Betalbatim Beach, South Goa - 403708',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30771.649313936087!2d73.8826507421875!3d15.28954700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfb38cc4555555%3A0x6bba8dc191f63fc6!2sBetalbatim%20Beach!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin',
          latitude: 15.2917,
          longitude: 73.9102,
          nearbyPlaces: [
            { name: 'Margao Railway Station', distance: '15 mins drive' },
            { name: 'Dabolim Airport (GOI)', distance: '30 mins drive' },
            { name: 'Cavelossim Yacht Club', distance: '20 mins drive' },
          ],
        },
      },
    ];

    const seededProjects = [];
    for (const proj of projectsToSeed) {
      const existing = await payload.find({
        collection: 'projects',
        where: { slug: { equals: proj.slug } },
        limit: 1,
      });

      if (existing.docs.length > 0) {
        // Update existing to ensure mock sections are fully populated
        const doc = await payload.update({
          collection: 'projects',
          id: existing.docs[0].id,
          data: proj as any,
        });
        seededProjects.push(doc);
      } else {
        const doc = await payload.create({
          collection: 'projects',
          data: proj as any,
        });
        seededProjects.push(doc);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Real estate categories, locations, and projects seeded successfully!',
      categories: seededCategories.map((c) => c.name),
      locations: seededLocations.map((l) => l.name),
      projects: seededProjects.map((p) => p.title),
    });
  } catch (error: any) {
    console.error('Seeding real estate failed:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to seed real estate.' },
      { status: 500 }
    );
  }
}
