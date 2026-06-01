'use client';

import { useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  User, 
  UserPlus, 
  Stethoscope, 
  CheckCircle, 
  ArrowLeft,
  Activity,
  Send,
  Users,
  Share2,
  Pill,
  Ambulance
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const patientSchema = z.object({
  userType: z.literal('patient'),
  q1_difficulty: z.enum(['Very Easy', 'Easy', 'Difficult', 'Very Difficult'], { required_error: "Please select an option" }),
  q2_online_app: z.enum(['Yes', 'No', 'Maybe'], { required_error: "Please select an option" }),
  q3_pay_video: z.enum(['₦3k', '₦5k', '₦8k', '₦12k', '₦15k+'], { required_error: "Please select an option" }),
  q4_home_visit: z.enum(['Yes', 'No', 'Depends on price'], { required_error: "Please select an option" }),
  q5_challenge: z.string().min(5, "Please tell us your challenge"),
  q6_ambulance: z.enum(['Yes', 'No', 'Maybe'], { required_error: "Please select an option" }),
  q7_drugs: z.enum(['Yes', 'No', 'Maybe'], { required_error: "Please select an option" }),
  q8_health_campaign: z.enum(['Yes', 'No', 'Maybe'], { required_error: "Please select an option" }),
});

const doctorSchema = z.object({
  userType: z.literal('doctor'),
  q1_consult_online: z.enum(['Yes', 'No', 'Maybe'], { required_error: "Please select an option" }),
  q2_charge_video: z.enum(['₦10k', '₦15k', '₦20k', '₦30k', '₦40k+'], { required_error: "Please select an option" }),
  q3_home_visit: z.enum(['Yes', 'No', 'Depends on distance and price'], { required_error: "Please select an option" }),
  q4_practice_challenge: z.string().min(5, "Please tell us your challenge"),
  q5_features: z.string().min(5, "Please share your ideas"),
  q6_availability: z.enum(['Weekdays only', 'Weekends only', 'Evenings only', 'Anytime'], { required_error: "Please select an option" }),
  q7_specialization: z.string().min(2, "Please share your specialization"),
  q8_patient_reach: z.enum(['1-10/day', '11-30/day', '31-50/day', '50+/day'], { required_error: "Please select an option" }),
});

const ngoSchema = z.object({
  userType: z.literal('ngo'),
  q1_partner: z.enum(['Yes', 'No', 'Maybe'], { required_error: "Please select an option" }),
  q2_services: z.string().min(5, "Please tell us about your services"),
  q3_reach: z.string().min(5, "Please tell us how you reach people"),
  q4_registration: z.enum(['Yes', 'No', 'Maybe'], { required_error: "Please select an option" }),
  q5_campaign_frequency: z.enum(['Monthly', 'Quarterly', 'Bi-annually', 'Annually', 'As needed'], { required_error: "Please select an option" }),
  q6_geographic_focus: z.string().min(2, "Please tell us your geographic focus"),
});

const formSchema = z.discriminatedUnion('userType', [patientSchema, doctorSchema, ngoSchema]);

type FormData = z.infer<typeof formSchema>;

export default function SurveyPage() {
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'ngo' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);
  const router = useRouter();

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: userType === 'patient' 
      ? { userType: 'patient' } 
      : userType === 'doctor' 
      ? { userType: 'doctor' }
      : userType === 'ngo'
      ? { userType: 'ngo' }
      : undefined,
    mode: 'onChange',
  });

  const { handleSubmit, formState: { errors, isValid, dirtyFields }, watch } = methods;

  const watchUserType = watch('userType');
  
  const totalQuestions = userType === 'patient' ? 8 : userType === 'doctor' ? 8 : userType === 'ngo' ? 6 : 0;
  const currentAnswered = Object.keys(dirtyFields).length;

  if (watchUserType && watchUserType !== userType) {
    setUserType(watchUserType);
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Submission failed');
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetSelection = () => {
    setUserType(null);
    methods.reset();
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Thank You So Much!</h2>
          <p className="text-slate-600 mb-2 leading-relaxed">
            Your feedback will help save lives and make healthcare accessible to millions in Nigeria.
          </p>
          <p className="text-primary font-semibold mb-8">
            Share this survey with friends and family to make an even bigger impact!
          </p>
          
          <div className="flex flex-col gap-3 mb-8">
            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" />
              Share Survey
            </button>
          </div>

          <button
            onClick={() => router.push('/')}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      <header className="bg-white sticky top-0 z-10 border-b border-slate-200 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button onClick={() => router.push('/')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div className="flex-1">
            <div className="flex justify-between mb-1 text-xs font-medium">
              <span className="text-slate-500">Progress</span>
              <span className="text-primary">{userType ? `${Math.round((currentAnswered / totalQuestions) * 100)}%` : '0%'}</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: userType ? `${(currentAnswered / totalQuestions) * 100}%` : '0%' }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-4">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {!userType ? (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <div className="text-center mb-8 pt-8">
                  <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-10 h-10 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900 mb-2">Tell us who you are</h1>
                  <p className="text-slate-500">Select your role to continue with the relevant questions tailored for you.</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <button
                    type="button"
                    onClick={() => methods.setValue('userType', 'patient', { shouldValidate: true })}
                    className="p-6 rounded-2xl border-2 border-slate-200 hover:border-primary hover:bg-blue-50/50 transition-all group text-left"
                  >
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <User className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">I am a Patient / Community Member</h3>
                    <p className="text-slate-500 text-sm">Answer questions about your healthcare needs and experiences.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => methods.setValue('userType', 'doctor', { shouldValidate: true })}
                    className="p-6 rounded-2xl border-2 border-slate-200 hover:border-primary hover:bg-blue-50/50 transition-all group text-left"
                  >
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Stethoscope className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">I am a Doctor / Healthcare Worker</h3>
                    <p className="text-slate-500 text-sm">Share your professional insights on telemedicine.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => methods.setValue('userType', 'ngo', { shouldValidate: true })}
                    className="p-6 rounded-2xl border-2 border-slate-200 hover:border-primary hover:bg-blue-50/50 transition-all group text-left"
                  >
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Users className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">I am an NGO / Health Organization</h3>
                    <p className="text-slate-500 text-sm">Help us understand how to partner for community health campaigns.</p>
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-right-4 space-y-6 pt-6">
                <div className="flex items-center justify-between">
                   <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                     {userType === 'patient' ? <User className="w-5 h-5"/> : userType === 'doctor' ? <Stethoscope className="w-5 h-5"/> : <Users className="w-5 h-5"/>}
                     {userType === 'patient' ? 'Patient Questions' : userType === 'doctor' ? 'Doctor Questions' : 'NGO Questions'}
                   </h2>
                   <button 
                    type="button" 
                    onClick={resetSelection}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Change
                  </button>
                </div>

                {userType === 'patient' && (
                  <>
                    <FormField
                      name="q1_difficulty"
                      label="1. How difficult is it for you to see a doctor when you or a family member is sick?"
                      type="radio"
                      options={['Very Easy', 'Easy', 'Difficult', 'Very Difficult']}
                    />
                    <FormField
                      name="q2_online_app"
                      label="2. Would you use an app to consult licensed doctors online via video, voice, or chat?"
                      type="radio"
                      options={['Yes', 'No', 'Maybe']}
                    />
                    <FormField
                      name="q3_pay_video"
                      label="3. How much would you be willing to pay for a 15-minute video consultation with a doctor?"
                      type="radio"
                      options={['₦3k', '₦5k', '₦8k', '₦12k', '₦15k+']}
                    />
                    <FormField
                      name="q4_home_visit"
                      label="4. Would you pay for a doctor to visit you at home when you're too sick to go out?"
                      type="radio"
                      options={['Yes', 'No', 'Depends on price']}
                    />
                    <FormField
                      name="q5_challenge"
                      label="5. What is your biggest healthcare challenge right now? (e.g., cost, distance, waiting time, trust)"
                      type="textarea"
                      placeholder="Please explain in your own words..."
                    />
                    <FormField
                      name="q6_ambulance"
                      label="6. Would you use an app to quickly book an ambulance in an emergency?"
                      type="radio"
                      options={['Yes', 'No', 'Maybe']}
                    />
                    <FormField
                      name="q7_drugs"
                      label="7. Would you buy genuine drugs from an app with delivery to your home?"
                      type="radio"
                      options={['Yes', 'No', 'Maybe']}
                    />
                    <FormField
                      name="q8_health_campaign"
                      label="8. Would you attend free health campaigns (e.g., free checkups, tests, deworming) organized by NGOs through an app?"
                      type="radio"
                      options={['Yes', 'No', 'Maybe']}
                    />
                  </>
                )}

                {userType === 'doctor' && (
                  <>
                    <FormField
                      name="q1_consult_online"
                      label="1. Would you consult patients online via video/voice/chat through an app?"
                      type="radio"
                      options={['Yes', 'No', 'Maybe']}
                    />
                    <FormField
                      name="q2_charge_video"
                      label="2. How much would you charge per 15-minute video consultation?"
                      type="radio"
                      options={['₦10k', '₦15k', '₦20k', '₦30k', '₦40k+']}
                    />
                    <FormField
                      name="q3_home_visit"
                      label="3. Are you open to doing home visits for patients through an app?"
                      type="radio"
                      options={['Yes', 'No', 'Depends on distance and price']}
                    />
                    <FormField
                      name="q4_practice_challenge"
                      label="4. What is the biggest challenge in your current practice? (e.g., patient reach, payment, scheduling)"
                      type="textarea"
                      placeholder="Please share your challenges..."
                    />
                    <FormField
                      name="q5_features"
                      label="5. What features would you most want in a telemedicine app to make your work easier?"
                      type="textarea"
                      placeholder="Please share your ideas..."
                    />
                    <FormField
                      name="q6_availability"
                      label="6. What times are you usually available for consultations?"
                      type="radio"
                      options={['Weekdays only', 'Weekends only', 'Evenings only', 'Anytime']}
                    />
                    <FormField
                      name="q7_specialization"
                      label="7. What is your medical specialization? (e.g., General Practitioner, Pediatrician, Surgeon)"
                      type="textarea"
                      placeholder="Your specialization..."
                    />
                    <FormField
                      name="q8_patient_reach"
                      label="8. Approximately how many patients do you see per day currently?"
                      type="radio"
                      options={['1-10/day', '11-30/day', '31-50/day', '50+/day']}
                    />
                  </>
                )}

                {userType === 'ngo' && (
                  <>
                    <FormField
                      name="q1_partner"
                      label="1. Would you partner with a telemedicine app to run free health campaigns in communities?"
                      type="radio"
                      options={['Yes', 'No', 'Maybe']}
                    />
                    <FormField
                      name="q2_services"
                      label="2. What kind of free health services do you usually organize? (e.g., free checkups, deworming, blood pressure screening)"
                      type="textarea"
                      placeholder="Please share your services..."
                    />
                    <FormField
                      name="q3_reach"
                      label="3. How do you currently reach people to inform them about your health outreaches?"
                      type="textarea"
                      placeholder="Please explain your methods..."
                    />
                    <FormField
                      name="q4_registration"
                      label="4. Would you like a platform to easily register attendees for your health campaigns?"
                      type="radio"
                      options={['Yes', 'No', 'Maybe']}
                    />
                    <FormField
                      name="q5_campaign_frequency"
                      label="5. How often do you organize health campaigns?"
                      type="radio"
                      options={['Monthly', 'Quarterly', 'Bi-annually', 'Annually', 'As needed']}
                    />
                    <FormField
                      name="q6_geographic_focus"
                      label="6. What is your primary geographic focus? (e.g., Lagos, rural areas, Northern Nigeria, specific communities)"
                      type="textarea"
                      placeholder="Your geographic focus..."
                    />
                  </>
                )}

                <div className="pt-8 pb-4">
                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="w-full bg-primary text-white font-bold py-5 px-6 rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Submitting...</span>
                    ) : (
                      <>
                        Submit Your Feedback
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </main>
  );
}

function FormField({
  name,
  label,
  type,
  options,
  placeholder
}: {
  name: any;
  label: string;
  type: 'radio' | 'textarea' | 'select';
  options?: string[];
  placeholder?: string;
}) {
  const { control, formState: { errors } } = useForm();
  const error = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <label className="block text-base font-semibold text-slate-800 mb-4 leading-relaxed">
            {label}
          </label>

          {type === 'radio' && options && (
            <div className="space-y-3">
              {options.map((option) => (
                <label
                  key={option}
                  className={cn(
                    "flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all",
                    field.value === option
                      ? "border-primary bg-blue-50"
                      : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center shrink-0",
                    field.value === option ? "border-primary" : "border-slate-300"
                  )}>
                    {field.value === option && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                  <span className={cn(
                    "font-medium",
                    field.value === option ? "text-primary" : "text-slate-600"
                  )}>
                    {option}
                  </span>
                  <input
                    type="radio"
                    value={option}
                    checked={field.value === option}
                    onChange={() => field.onChange(option)}
                    className="sr-only"
                  />
                </label>
              ))}
            </div>
          )}

          {type === 'textarea' && (
            <textarea
              {...field}
              placeholder={placeholder}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[120px] resize-none transition-all text-base"
            />
          )}

          {error && (
            <p className="text-red-500 text-sm mt-3 flex items-center gap-1">
              <span className="font-bold">!</span> {error.message as string}
            </p>
          )}
        </div>
      )}
    />
  );
}
