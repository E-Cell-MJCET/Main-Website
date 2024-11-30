'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const yearOptions = ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Fifth Year']
const departmentOptions = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Chemical Engineering', 'Other']

const coFounderSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  year: z.enum(yearOptions),
  department: z.enum(departmentOptions),
  rollNumber: z.string().min(1, 'Roll number is required'),
  linkedinUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
})

const formSchema = z.object({
  startupName: z.string().min(2, 'Startup name must be at least 2 characters'),
  founderName: z.string().min(2, 'Founder name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  year: z.enum(yearOptions),
  department: z.enum(departmentOptions),
  rollNumber: z.string().min(1, 'Roll number is required'),
  linkedinUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  hasCoFounders: z.boolean(),
  coFounder1: coFounderSchema.optional(),
  coFounder2: coFounderSchema.optional(),
  coFounder3: coFounderSchema.optional(),
  businessDomain: z.string().min(1, 'Business domain is required'),
  businessPitch: z.string().max(50, 'Pitch must be 50 words or less'),
  businessDescription: z.string().min(10, 'Description must be at least 10 characters'),
  demoUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
})

export default function StartupRegistrationForm() {
  const [hasCoFounders, setHasCoFounders] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasCoFounders: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { startupName, founderName, email, phoneNumber, year, department, rollNumber, linkedinUrl, hasCoFounders, coFounder1, coFounder2, coFounder3, businessDomain, businessPitch, businessDescription, demoUrl } = values;
  
    // Construct the data to be inserted into Supabase
    const data = {
      startup_name: startupName,
      founders_name: founderName,
      emaill: email,  // Be sure to use the correct column name 'emaill' as in your table
      phone_number: phoneNumber,
      year: year,
      department: department,
      roll_number: rollNumber,
      linkedin_url: linkedinUrl,
      has_co_founders: hasCoFounders,
      business_domain: businessDomain,
      business_pitch: businessPitch,
      business_description: businessDescription,
      demo_url: demoUrl || null, // Optional field, set to null if not provided
      co_founders: [] as any[],  // Initialize empty array for co-founders
  
      // If co-founders exist, push them to the co_founders array
      ...(hasCoFounders && {
        co_founders: [
          coFounder1 ? {
            name: coFounder1.name,
            email: coFounder1.email,
            phone_number: coFounder1.phoneNumber,
            year: coFounder1.year,
            department: coFounder1.department,
            roll_number: coFounder1.rollNumber,
            linkedin_url: coFounder1.linkedinUrl,
          } : null,
          coFounder2 ? {
            name: coFounder2.name,
            email: coFounder2.email,
            phone_number: coFounder2.phoneNumber,
            year: coFounder2.year,
            department: coFounder2.department,
            roll_number: coFounder2.rollNumber,
            linkedin_url: coFounder2.linkedinUrl,
          } : null,
          coFounder3 ? {
            name: coFounder3.name,
            email: coFounder3.email,
            phone_number: coFounder3.phoneNumber,
            year: coFounder3.year,
            department: coFounder3.department,
            roll_number: coFounder3.rollNumber,
            linkedin_url: coFounder3.linkedinUrl,
          } : null,
        ]
      })
    };
  
    // Send data to Supabase
    supabase
      .from('startups')  // Replace 'startups' with your actual table name
      .insert([data])
      .then(response => {
        if (response.error) {
          console.error('Error inserting data:', response.error);
        } else {
          console.log('Data inserted successfully:', response.data);
          // Optionally clear the form or show a success message here
        }
      })
      .catch(error => {
        console.error('Error inserting data:', error);
      });
  }
  

  return (
    <Card className="w-full border-0 bg-white shadow-lg">
      <CardHeader className="border-b bg-gradient-to-r from-[#FF4D00] to-[#FF0000] px-6 py-4">
        <CardTitle className="text-xl text-white">Startup Registration Form</CardTitle>
        <CardDescription className="text-white/90">Please fill out all required fields to register your startup.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <h2 className="border-b pb-2 text-lg font-semibold text-[#0A1930]">Startup Information</h2>
              <FormField
                control={form.control}
                name="startupName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-[#0A1930]">Startup Name *</FormLabel>
                    <FormControl>
                      <Input className="border-[#4A154B]/20 bg-white focus:border-[#FF4D00] focus:ring-[#FF4D00]/20" placeholder="Enter startup name" {...field} />
                    </FormControl>
                    <FormMessage className="text-[#FF0000]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="founderName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-[#0A1930]">Founder's Name *</FormLabel>
                    <FormControl>
                      <Input className="border-[#4A154B]/20 bg-white focus:border-[#FF4D00] focus:ring-[#FF4D00]/20" placeholder="Enter founder's name" {...field} />
                    </FormControl>
                    <FormMessage className="text-[#FF0000]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-[#0A1930]">Email *</FormLabel>
                    <FormControl>
                      <Input type="email" className="border-[#4A154B]/20 bg-white focus:border-[#FF4D00] focus:ring-[#FF4D00]/20" placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage className="text-[#FF0000]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-[#0A1930]">Phone Number *</FormLabel>
                    <FormControl>
                      <Input className="border-[#4A154B]/20 bg-white focus:border-[#FF4D00] focus:ring-[#FF4D00]/20" placeholder="Enter 10-digit phone number" {...field} />
                    </FormControl>
                    <FormMessage className="text-[#FF0000]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-[#0A1930]">Year *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-[#4A154B]/20 bg-white focus:border-[#FF4D00] focus:ring-[#FF4D00]/20">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {yearOptions.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[#FF0000]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-[#0A1930]">Department *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-[#4A154B]/20 bg-white focus:border-[#FF4D00] focus:ring-[#FF4D00]/20">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departmentOptions.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[#FF0000]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rollNumber"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-[#0A1930]">Roll Number *</FormLabel>
                    <FormControl>
                      <Input className="border-[#4A154B]/20 bg-white focus:border-[#FF4D00] focus:ring-[#FF4D00]/20" placeholder="Enter roll number" {...field} />
                    </FormControl>
                    <FormMessage className="text-[#FF0000]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-[#0A1930]">LinkedIn Profile URL</FormLabel>
                    <FormControl>
                      <Input className="border-[#4A154B]/20 bg-white focus:border-[#FF4D00] focus:ring-[#FF4D00]/20" placeholder="Enter LinkedIn URL" {...field} />
                    </FormControl>
                    <FormMessage className="text-[#FF0000]" />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <h2 className="border-b pb-2 text-lg font-semibold text-[#0A1930]">Co-Founder Details</h2>
              <FormField
                control={form.control}
                name="hasCoFounders"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        className="border-[#4A154B]/20 data-[state=checked]:border-[#FF4D00] data-[state=checked]:bg-[#FF4D00]"
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked)
                          setHasCoFounders(checked as boolean)
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Do you have any co-founders?</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            {hasCoFounders && (
              <div className="space-y-4">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="space-y-4 border-t pt-4">
                    <h3 className="text-md font-semibold">Co-Founder {index} {index === 1 ? '(Required)' : '(Optional)'}</h3>
                    {['name', 'email', 'phoneNumber', 'year', 'department', 'rollNumber', 'linkedinUrl'].map((field) => (
                      <FormField
                        key={field}
                        control={form.control}
                        name={`coFounder${index}.${field}` as any}
                        render={({ field: fieldProps }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="font-medium text-[#0A1930]">{field.charAt(0).toUpperCase() + field.slice(1)} {index === 1 ? '*' : ''}</FormLabel>
                            <FormControl>
                              {field === 'year' ? (
                                <Select onValueChange={fieldProps.onChange} defaultValue={fieldProps.value}>
                                  <FormControl>
                                    <SelectTrigger className="border-[#4A154B]/20 bg-white focus:border-[#FF4D00] focus:ring-[#FF4D00]/20">
                                      <SelectValue placeholder={`Select ${field}`} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {yearOptions.map((year) => (
                                      <SelectItem key={year} value={year}>
                                        {year}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : field === 'department' ? (
                                <Select onValueChange={fieldProps.onChange} defaultValue={fieldProps.value}>
                                  <FormControl>
                                    <SelectTrigger className="border-[#4A154B]/20 bg-white focus:border-[#FF4D00] focus:ring-[#FF4D00]/20">
                                      <SelectValue placeholder={`Select ${field}`} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {departmentOptions.map((dept) => (
                                      <SelectItem key={dept} value={dept}>
                                        {dept}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Input className="border-[#4A154B]/20 bg-white focus:border-[#FF4D00] focus:ring-[#FF4D00]/20" placeholder={`Enter ${field}`} {...fieldProps} />
                              )}
                            </FormControl>
                            <FormMessage className="text-[#FF0000]" />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
            <div className="space-y-4">
              <h2 className="border-b pb-2 text-lg font-semibold text-[#0A1930]">Business Details</h2>
              <FormField
                control={form.control}
                name="businessDomain"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-[#0A1930]">Domain of Business *</FormLabel>
                    <FormControl>
                      <Input className="border-[#4A154B]/20 bg-white focus:border-[#FF4D00] focus:ring-[#FF4D00]/20" placeholder="Enter business domain" {...field} />
                    </FormControl>
                    <FormMessage className="text-[#FF0000]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessPitch"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-[#0A1930]">Pitch Your Business Idea *</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none border-[#4A154B]/20 bg-white focus:border-[#FF4D00] focus:ring-[#FF4D00]/20"
                        placeholder="Enter your business pitch (max 50 words)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Limited to 50 words</FormDescription>
                    <FormMessage className="text-[#FF0000]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessDescription"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-[#0A1930]">Basic Description of Idea *</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none border-[#4A154B]/20 bg-white focus:border-[#FF4D00] focus:ring-[#FF4D00]/20"
                        placeholder="Enter a detailed description of your business idea"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#FF0000]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="demoUrl"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-[#0A1930]">Demo URL</FormLabel>
                    <FormControl>
                      <Input className="border-[#4A154B]/20 bg-white focus:border-[#FF4D00] focus:ring-[#FF4D00]/20" placeholder="Enter demo video URL (optional)" {...field} />
                    </FormControl>
                    <FormDescription>Optional: Provide a link to your demo video</FormDescription>
                    <FormMessage className="text-[#FF0000]" />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-[#FF4D00] to-[#FF0000] text-white transition-all duration-300 hover:from-[#FF0000] hover:to-[#FF4D00]">Submit Registration</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
