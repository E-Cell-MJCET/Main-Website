# Teams Data Management

This directory contains JSON files for managing team data across different academic years.

## File Structure

```
data/teams/
├── 2024-2025.json    # Current year team data
├── 2023-2024.json    # Previous year team data (if exists)
└── README.md         # This documentation file
```

## Team Data Structure

Each JSON file represents a complete team structure for an academic year and follows this schema:

### Root Object

```json
{
  "year": "2024-2025",
  "governingBody": [...],
  "categories": [...],
  "execomMembers": [...],
  "coreTeamMembers": [...]
}
```

## Data Schemas

### 1. Governing Body Members

The highest level of leadership in the organization.

```json
{
  "name": "Abid Nafi",
  "role": "Chief Technology Officer",
  "imageUrl": "/assets/Team/GB/abid.png",
  "bgColor": "bg-gradient-to-br from-blue-600 to-cyan-800",
  "quote": "Have an attitude that you can do anything, only then you will go and try anything."
},
{
  "name": "Maliha Ishaq",
  "role": "Chief Operating Officer",
  "imageUrl": "/assets/Team/GB/maliha.jpeg",
  "bgColor": "bg-gradient-to-br from-rose-600 to-pink-800",
  "quote": "Believe and achieve."
}
```

**Fields:**

- `name` (string): Full name of the member
- `role` (string): Official title/position
- `imageUrl` (string): Path to profile image
- `bgColor` (string): Tailwind CSS gradient classes for background
- `quote` (string): Inspirational quote or motto

### 2. Categories

Array of department/team categories for filtering purposes.

```json
[
  "All",
  "Technical",
  "Relations and Outreach",
  "Human Resource",
  "Events",
  "Entrepreneurship Coordinator",
  "Design",
  "Editorial and Research",
  "Media",
  "Marketing",
  "Operations"
]
```

### 3. Executive Committee (Execom) Members

Department heads and senior leadership positions.

```json
{
  "name": "Aayan Sayed",
  "role": "Technical Team Head",
  "department": "Technical",
  "image": "/assets/Team/Execom/Technical/Aayan/Aayan.jpg",
  "gif": "/assets/Team/Execom/Technical/Aayan/gif.gif",
  "link": ""
},
{
  "name": "Syed Abdul Muneeb",
  "role": "Technical Team Head",
  "department": "Technical",
  "image": "/assets/Team/Execom/Technical/Muneeb/Muneeb.jpeg",
  "gif": "/assets/Team/Execom/Technical/Muneeb/Muneeb.gif",
  "link": ""
}
```

**Fields:**

- `name` (string): Full name of the member
- `role` (string): Specific role/position title
- `department` (string): Department they belong to (must match categories)
- `image` (string): Path to static profile image
- `gif` (string): Path to animated GIF version of profile
- `link` (string): Optional link to personal profile page

### 4. Core Team Members

Supporting team members and volunteers.

```json
{
  "name": "Mohammed Aqib Khan",
  "role": "Technical",
  "image": "/assets/Team/Core/1.jpeg",
  "color": "from-yellow-200 to-yellow-100"
},
{
  "name": "Mohammad AbdulBaseer",
  "role": "Technical",
  "image": "/assets/Team/Core/2.jpg",
  "color": "from-pink-200 to-pink-100"
}
```

**Fields:**

- `name` (string): Full name of the member
- `role` (string): Department/area of work
- `image` (string): Path to profile image
- `color` (string): Tailwind CSS gradient classes for card styling

## Asset Organization

### Image Structure

```
public/assets/Team/
├── GB/                          # Governing Body
│   ├── abid.jpeg
│   ├── maliha.jpeg
│   └── ...
├── Execom/                      # Executive Committee
│   ├── Technical/
│   │   ├── Aayan/
│   │   │   ├── Aayan.jpg       # Static image
│   │   │   └── gif.gif         # Animated version
│   │   └── ...
│   ├── Design/
│   ├── Media/
│   └── ...
└── Core/                        # Core Team
    ├── 1.jpeg
    ├── 2.jpg
    └── ...
```

## Usage Guidelines

### Adding New Team Members

1. **Governing Body**: Add to `governingBody` array with all required fields
2. **Execom Members**: Add to `execomMembers` array with department matching categories
3. **Core Team**: Add to `coreTeamMembers` array with appropriate color scheme

### Image Requirements

- **Governing Body**: High-quality professional photos
- **Execom Members**: Both static image and animated GIF version
- **Core Team**: Standard profile photos
- **Format**: JPG, JPEG, PNG, WebP supported
- **Recommended Size**: 400x400px minimum for profiles

### Color Schemes

#### Governing Body Background Colors

Use Tailwind gradient classes:

- `bg-gradient-to-br from-purple-600 to-indigo-800`
- `bg-gradient-to-br from-amber-600 to-orange-800`
- `bg-gradient-to-br from-emerald-600 to-teal-800`

#### Core Team Colors

Use light gradient classes for cards:

- `from-yellow-200 to-yellow-100`
- `from-pink-200 to-pink-100`
- `from-blue-200 to-blue-100`

## Component Integration

### Team Page Components

- `components/teams/` - Team display components
- `app/team/page.tsx` - Main team page
- Import data: `import teamData from '@/data/teams/2024-2025.json'`

### Filtering System

Categories are used for:

- Department filtering
- Role-based displays
- Navigation menus
- Search functionality

## Validation Rules

### Required Fields

**Governing Body:**

- ✅ name, role, imageUrl, bgColor, quote

**Execom Members:**

- ✅ name, role, department, image, gif
- ⚠️ link (optional)

**Core Team:**

- ✅ name, role, image, color

### Data Consistency

1. **Department Matching**: Execom `department` must exist in `categories` array
2. **Image Paths**: All paths must start with `/assets/`
3. **Color Classes**: Use valid Tailwind CSS classes
4. **File Naming**: Use consistent naming convention for assets

## Year Management

### Creating New Year Data

1. Copy previous year's JSON file
2. Rename to new academic year (e.g., `2025-2026.json`)
3. Update `year` field
4. Replace team member data
5. Update asset paths if needed

### Archive Management

- Keep previous years' data for historical reference
- Update component imports to load current year
- Maintain consistent schema across years

## Best Practices

### Image Optimization

- Compress images before adding to assets
- Use WebP format when possible
- Maintain consistent aspect ratios
- Test on different screen sizes

### Data Maintenance

- Regular verification of image paths
- Consistent naming conventions
- Proper role/department alignment
- Up-to-date contact information

### Performance Considerations

- Lazy load images in components
- Use Next.js Image component for optimization
- Consider image preloading for critical members
- Implement proper error handling for missing assets

## Example Implementation

```typescript
// Import team data
import teamData from "@/data/teams/2024-2025.json";

// Access different sections
const governingBody = teamData.governingBody;
const execomMembers = teamData.execomMembers;
const coreTeam = teamData.coreTeamMembers;
const categories = teamData.categories;

// Filter by department
const technicalTeam = execomMembers.filter(
  (member) => member.department === "Technical"
);

// Get specific member
const chiefCoordinator = governingBody.find(
  (member) => member.role === "Chief Coordinator"
);

// Example: Display all team members by category
categories.forEach((category) => {
  if (category !== "All") {
    const categoryMembers = execomMembers.filter(
      (member) => member.department === category
    );
    console.log(`${category} Team:`, categoryMembers);
  }
});
```

## Complete Data Structure Example

Here's a complete example showing all data types in a single JSON structure:

```json
{
  "year": "2024-2025",
  "governingBody": [
    {
      "name": "Abid Nafi",
      "role": "Chief Technology Officer",
      "imageUrl": "/assets/Team/GB/abid.png",
      "bgColor": "bg-gradient-to-br from-blue-600 to-cyan-800",
      "quote": "Have an attitude that you can do anything, only then you will go and try anything."
    },
    {
      "name": "Maliha Ishaq",
      "role": "Chief Operating Officer",
      "imageUrl": "/assets/Team/GB/maliha.jpeg",
      "bgColor": "bg-gradient-to-br from-rose-600 to-pink-800",
      "quote": "Believe and achieve."
    }
  ],
  "categories": ["All", "Technical", "Design", "Media"],
  "execomMembers": [
    {
      "name": "Aayan Sayed",
      "role": "Technical Team Head",
      "department": "Technical",
      "image": "/assets/Team/Execom/Technical/Aayan/Aayan.jpg",
      "gif": "/assets/Team/Execom/Technical/Aayan/gif.gif",
      "link": ""
    },
    {
      "name": "Syed Abdul Muneeb",
      "role": "Technical Team Head",
      "department": "Technical",
      "image": "/assets/Team/Execom/Technical/Muneeb/Muneeb.jpeg",
      "gif": "/assets/Team/Execom/Technical/Muneeb/Muneeb.gif",
      "link": ""
    }
  ],
  "coreTeamMembers": [
    {
      "name": "Mohammed Aqib Khan",
      "role": "Technical",
      "image": "/assets/Team/Core/1.jpeg",
      "color": "from-yellow-200 to-yellow-100"
    },
    {
      "name": "Mohammad AbdulBaseer",
      "role": "Technical",
      "image": "/assets/Team/Core/2.jpg",
      "color": "from-pink-200 to-pink-100"
    }
  ]
}
```

## Troubleshooting

### Common Issues

1. **Missing Images**: Verify file paths and extensions
2. **Invalid Colors**: Check Tailwind CSS class names
3. **Department Mismatch**: Ensure department exists in categories
4. **JSON Syntax**: Validate JSON format

### Validation Tools

- Use JSON validators for syntax checking
- Test image paths in browser
- Verify Tailwind classes in development
- Check component rendering with new data

---

## Contributing

When adding or updating team data:

1. Follow the established schema
2. Verify all image assets exist
3. Test the changes locally
4. Ensure data consistency
5. Update this README if schema changes

For questions or issues, contact the technical team.
