import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial data...');

  // 1. Seed Admin User
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync('admin123', 10);
  await prisma.adminUser.upsert({
    where: { email: 'admin@dreamproperties.in' },
    update: { passwordHash: adminPasswordHash },
    create: {
      email: 'admin@dreamproperties.in',
      name: 'Dream Properties Admin',
      passwordHash: adminPasswordHash,
    },
  });

  // 2. Seed Sample Leads
  const initialLeads = [
    {
      name: 'Rajesh Singhania',
      phone: '+91 98390 12345',
      email: 'rajesh.singhania@example.com',
      type: 'BUYER',
      service: 'Turnkey Interiors',
      propertyType: '4 BHK Luxury Apartment',
      location: 'Swaroop Nagar, Kanpur',
      budgetRange: '₹35 - ₹50 Lakhs',
      message: 'Bought a 4 BHK via Dream Properties near KVM College. Need turnkey modular interiors with Vastu compliance.',
      source: 'website',
      status: 'NEW',
      notes: 'High priority lead from Dream Properties buyer referral.',
      language: 'en',
    },
    {
      name: 'Anita Tandon',
      phone: '+91 94150 98765',
      email: 'anita.tandon@example.com',
      type: 'SELLER',
      service: 'Home Staging',
      propertyType: '3 BHK Builder Floor',
      location: 'Civil Lines, Kanpur',
      budgetRange: '₹5 - ₹10 Lakhs',
      message: 'Looking to stage our property before listing on Dream Properties for sale.',
      source: 'website',
      status: 'CONTACTED',
      notes: 'Spoke on phone, scheduled site visit for Tuesday 4 PM.',
      language: 'en',
    },
    {
      name: 'Vikas Aggarwal',
      phone: '+91 99351 44556',
      email: 'vikas.aggarwal@gmail.com',
      type: 'LANDLORD',
      service: 'Rental-Ready Furnishing',
      propertyType: '2 BHK Penthouse',
      location: 'Kakadeo, Kanpur',
      budgetRange: '₹8 - ₹12 Lakhs',
      message: 'Need complete modular kitchen and rental furnishing for corporate lease tenant.',
      source: 'website',
      status: 'QUOTED',
      notes: 'Shared estimate #DP-2026-081.',
      language: 'hi',
    },
    {
      name: 'Pradeep Jaiswal',
      phone: '+91 82990 55443',
      email: 'pradeep.jaiswal@hotelregency.in',
      type: 'PARTNER',
      service: 'Commercial Fit-Outs',
      propertyType: 'Boutique Hotel & Restaurant',
      location: 'Khalasi Line, Kanpur',
      budgetRange: '₹75 Lakhs+',
      message: 'Referred by Dream Properties office. Fit-out for 18 luxury guest rooms.',
      source: 'partner_referral',
      status: 'WON',
      notes: 'Contract signed. 3D renders approved.',
      language: 'en',
    },
  ];

  for (const lead of initialLeads) {
    await prisma.lead.create({ data: lead });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
