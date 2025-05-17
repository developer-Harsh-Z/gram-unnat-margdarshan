import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ProfileService } from '@/services/ProfileService';
import { Loader2 } from 'lucide-react';

interface ProfileData {
  personal: {
    name: string;
    age: number;
    gender: string;
    language: string;
    village: string;
    district: string;
    mobile: string;
  };
  education: {
    level: string;
    passing_year: string;
    institution: string;
    percentage: string;
  };
  skills: string[];
  interests: string[];
}

const ProfileForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [profileData, setProfileData] = useState<ProfileData>({
    personal: {
      name: '',
      age: 0,
      gender: '',
      language: '',
      village: '',
      district: '',
      mobile: '',
    },
    education: {
      level: '',
      passing_year: '',
      institution: '',
      percentage: '',
    },
    skills: [],
    interests: [],
  });

  useEffect(() => {
    if (user) {
      loadProfileData();
    }
  }, [user]);

  const loadProfileData = async () => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Please log in to view your profile.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setLoading(true);
      const [profile, education, skills, interests] = await Promise.all([
        ProfileService.getUserProfile(user.id),
        ProfileService.getUserEducation(user.id),
        ProfileService.getUserSkills(user.id),
        ProfileService.getUserInterests(user.id),
      ]);

      setProfileData({
        personal: {
          name: profile?.full_name || '',
          age: profile?.age || 0,
          gender: profile?.gender || '',
          language: profile?.language || '',
          village: profile?.village || '',
          district: profile?.district || '',
          mobile: profile?.mobile || '',
        },
        education: {
          level: education?.level || '',
          passing_year: education?.passing_year || '',
          institution: education?.institution || '',
          percentage: education?.percentage || '',
        },
        skills: skills || [],
        interests: interests || [],
      });
    } catch (error) {
      console.error('Error loading profile data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section: keyof ProfileData, field: string, value: any) => {
    if (section === 'skills' || section === 'interests') {
      setProfileData(prev => ({
        ...prev,
        [section]: value,
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }
  };

  const validateForm = () => {
    const { personal, education } = profileData;
    
    if (!personal.name || !personal.age || !personal.gender || !personal.language || !personal.village || !personal.district || !personal.mobile) {
      toast({
        title: 'Error',
        description: 'Please fill in all personal information fields.',
        variant: 'destructive',
      });
      return false;
    }

    if (!education.level || !education.passing_year || !education.institution || !education.percentage) {
      toast({
        title: 'Error',
        description: 'Please fill in all education information fields.',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Please log in to save your profile.',
        variant: 'destructive',
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      await Promise.all([
        ProfileService.savePersonalInfo(user.id, profileData.personal),
        ProfileService.saveEducationInfo(user.id, profileData.education),
        ProfileService.saveSkills(user.id, profileData.skills),
        ProfileService.saveInterests(user.id, profileData.interests),
      ]);

      toast({
        title: 'Success',
        description: 'Profile updated successfully!',
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to save profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your personal information, education details, skills, and interests.</CardDescription>
        </CardHeader>
        <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="interests">Interests</TabsTrigger>
            </TabsList>
            
          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  value={profileData.personal.name}
                  onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
                  placeholder="Enter your full name"
                />
                </div>
                <div className="space-y-2">
                <Label>Age</Label>
                <Input
                  type="number"
                  value={profileData.personal.age || ''}
                  onChange={(e) => {
                    const value = e.target.value === '' ? 0 : parseInt(e.target.value);
                    handleInputChange('personal', 'age', isNaN(value) ? 0 : value);
                  }}
                  placeholder="Enter your age"
                  min="0"
                  max="120"
                />
              </div>
                <div className="space-y-2">
                <Label>Gender</Label>
                <Select
                  value={profileData.personal.gender}
                  onValueChange={(value) => handleInputChange('personal', 'gender', value)}
                >
                  <SelectTrigger>
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
                <Label>Preferred Language</Label>
                <Select
                  value={profileData.personal.language}
                  onValueChange={(value) => handleInputChange('personal', 'language', value)}
                >
                  <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                  </Select>
              </div>
                <div className="space-y-2">
                <Label>Village</Label>
                <Input
                  value={profileData.personal.village}
                  onChange={(e) => handleInputChange('personal', 'village', e.target.value)}
                  placeholder="Enter your village"
                />
              </div>
                <div className="space-y-2">
                <Label>District</Label>
                <Input
                  value={profileData.personal.district}
                  onChange={(e) => handleInputChange('personal', 'district', e.target.value)}
                  placeholder="Enter your district"
                />
                </div>
                <div className="space-y-2">
                <Label>Mobile Number</Label>
                <Input
                  type="tel"
                  value={profileData.personal.mobile}
                  onChange={(e) => handleInputChange('personal', 'mobile', e.target.value)}
                  placeholder="Enter your mobile number"
                />
              </div>
              </div>
            </TabsContent>
            
          <TabsContent value="education" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label>Education Level</Label>
                <Select
                  value={profileData.education.level}
                  onValueChange={(value) => handleInputChange('education', 'level', value)}
                >
                  <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="higher_secondary">Higher Secondary</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                <Label>Passing Year</Label>
                <Input
                  value={profileData.education.passing_year}
                  onChange={(e) => handleInputChange('education', 'passing_year', e.target.value)}
                  placeholder="Enter passing year"
                />
              </div>
                <div className="space-y-2">
                <Label>Institution</Label>
                <Input
                  value={profileData.education.institution}
                  onChange={(e) => handleInputChange('education', 'institution', e.target.value)}
                  placeholder="Enter institution name"
                />
              </div>
              <div className="space-y-2">
                <Label>Percentage</Label>
                <Input
                  value={profileData.education.percentage}
                  onChange={(e) => handleInputChange('education', 'percentage', e.target.value)}
                  placeholder="Enter percentage"
                />
              </div>
              </div>
            </TabsContent>
            
          <TabsContent value="skills" className="space-y-4">
              <div className="space-y-2">
              <Label>Skills</Label>
              <Select
                value={profileData.skills[0] || ''}
                onValueChange={(value) => {
                  if (!profileData.skills.includes(value)) {
                    handleInputChange('skills', '', [...profileData.skills, value]);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select skills" />
                    </SelectTrigger>
                    <SelectContent>
                  <SelectItem value="reading">Reading</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                  <SelectItem value="speaking">Speaking</SelectItem>
                  <SelectItem value="listening">Listening</SelectItem>
                  <SelectItem value="computer">Computer Skills</SelectItem>
                    </SelectContent>
                  </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {profileData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => {
                        const newSkills = profileData.skills.filter((_, i) => i !== index);
                        handleInputChange('skills', '', newSkills);
                      }}
                      className="text-primary hover:text-primary/80"
                    >
                      ×
                    </button>
                </div>
                ))}
              </div>
                </div>
          </TabsContent>
              
          <TabsContent value="interests" className="space-y-4">
                <div className="space-y-2">
              <Label>Interests</Label>
              <Select
                value={profileData.interests[0] || ''}
                onValueChange={(value) => {
                  if (!profileData.interests.includes(value)) {
                    handleInputChange('interests', '', [...profileData.interests, value]);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select interests" />
                    </SelectTrigger>
                    <SelectContent>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {profileData.interests.map((interest, index) => (
                  <div
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {interest}
                    <button
                      onClick={() => {
                        const newInterests = profileData.interests.filter((_, i) => i !== index);
                        handleInputChange('interests', '', newInterests);
                      }}
                      className="text-primary hover:text-primary/80"
                    >
                      ×
                    </button>
                </div>
                ))}
              </div>
              </div>
            </TabsContent>
          </Tabs>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Profile'
            )}
          </Button>
        </div>
        </CardContent>
      </Card>
  );
};

export default ProfileForm;
