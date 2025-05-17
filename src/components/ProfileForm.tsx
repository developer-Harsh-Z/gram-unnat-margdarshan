
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfileForm = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create Your Profile</CardTitle>
          <CardDescription>
            Complete your profile to get personalized career recommendations and opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="education">Education & Skills</TabsTrigger>
              <TabsTrigger value="interests">Interests & Goals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" placeholder="Your age" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Preferred Language</Label>
                  <Select>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="kannada">Kannada</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="telugu">Telugu</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Village/Town</Label>
                  <Input id="location" placeholder="Your village or town name" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Select>
                    <SelectTrigger id="district">
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="belgaum">Belgaum</SelectItem>
                      <SelectItem value="bijapur">Bijapur</SelectItem>
                      <SelectItem value="bagalkot">Bagalkot</SelectItem>
                      <SelectItem value="dharwad">Dharwad</SelectItem>
                      <SelectItem value="gadag">Gadag</SelectItem>
                      <SelectItem value="haveri">Haveri</SelectItem>
                      <SelectItem value="uttaraKannada">Uttara Kannada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input id="mobile" placeholder="Your mobile number" />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-blue-800 hover:bg-blue-700 text-white">Next: Education & Skills</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="education" className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="educationLevel">Highest Education</Label>
                  <Select>
                    <SelectTrigger id="educationLevel">
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="highSchool">High School</SelectItem>
                      <SelectItem value="puc">PUC</SelectItem>
                      <SelectItem value="iti">ITI</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passingYear">Year of Passing</Label>
                  <Select>
                    <SelectTrigger id="passingYear">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                      <SelectItem value="earlier">Earlier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution/School Name</Label>
                  <Input id="institution" placeholder="Your institution or school name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="marks">Percentage/CGPA</Label>
                  <Input id="marks" placeholder="Your percentage or CGPA" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Technical Skills (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-800 focus:ring-blue-800" />
                    <span>Computer Basics</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-800 focus:ring-blue-800" />
                    <span>MS Office</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-800 focus:ring-blue-800" />
                    <span>Internet</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-800 focus:ring-blue-800" />
                    <span>Smartphone</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-800 focus:ring-blue-800" />
                    <span>Basic English</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-800 focus:ring-blue-800" />
                    <span>Vocational Skills</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline">Back: Personal Info</Button>
                <Button className="bg-blue-800 hover:bg-blue-700 text-white">Next: Interests & Goals</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="interests" className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label>Career Interests (Select up to 3)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-800 focus:ring-blue-800" />
                    <span>Technology</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-800 focus:ring-blue-800" />
                    <span>Agriculture</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-800 focus:ring-blue-800" />
                    <span>Healthcare</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-800 focus:ring-blue-800" />
                    <span>Teaching</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-800 focus:ring-blue-800" />
                    <span>Business</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-800 focus:ring-blue-800" />
                    <span>Manufacturing</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-800 focus:ring-blue-800" />
                    <span>Hospitality</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-800 focus:ring-blue-800" />
                    <span>Government</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-800 focus:ring-blue-800" />
                    <span>Arts & Crafts</span>
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goals">Career Goals</Label>
                  <Select>
                    <SelectTrigger id="goals">
                      <SelectValue placeholder="Select your primary goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="job">Find a job soon</SelectItem>
                      <SelectItem value="skills">Learn new skills</SelectItem>
                      <SelectItem value="education">Further education</SelectItem>
                      <SelectItem value="business">Start a business</SelectItem>
                      <SelectItem value="explore">Explore options</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="digital">Digital Access</Label>
                  <Select>
                    <SelectTrigger id="digital">
                      <SelectValue placeholder="Select your internet access" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smartphone">Smartphone with data</SelectItem>
                      <SelectItem value="limited">Limited smartphone access</SelectItem>
                      <SelectItem value="shared">Shared or community access</SelectItem>
                      <SelectItem value="basic">Basic phone only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="willingness">Willing to Relocate</Label>
                  <Select>
                    <SelectTrigger id="willingness">
                      <SelectValue placeholder="Select your willingness to relocate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nearby">Within district only</SelectItem>
                      <SelectItem value="state">Anywhere in state</SelectItem>
                      <SelectItem value="india">Anywhere in India</SelectItem>
                      <SelectItem value="no">Not willing to relocate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline">Back: Education & Skills</Button>
                <Button className="bg-blue-800 hover:bg-blue-700 text-white">Complete Profile</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm;
