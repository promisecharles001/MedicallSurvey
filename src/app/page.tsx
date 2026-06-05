import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { 
  Activity, 
  User, 
  UserPlus, 
  HeartPulse, 
  Home as HomeIcon,
  Ambulance, 
  Pill, 
  Users,
  Share2
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="min-h-screen flex flex-col items-center justify-center p-6 py-12">
        <div className="w-full max-w-2xl flex flex-col items-center gap-8">
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-lg shadow-primary/20 mb-2">
            <Activity className="text-white w-10 h-10" />
          </div>
          
          <div className="text-center space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-2">
                Help Shape MediCall
              </h1>
              <p className="text-xl font-bold text-primary">
                Quality Healthcare Made Simple & Accessible in Nigeria
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-6 rounded-2xl border border-blue-100 text-left space-y-4">
              <p className="text-slate-700 font-medium text-lg">
                MediCall is a new telemedicine app that allows you to:
              </p>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <HeartPulse className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-base text-slate-700">Consult with licensed doctors from anywhere (video call, voice call, or chat)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <HomeIcon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-base text-slate-700">Get a doctor to visit you at home when needed</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Ambulance className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-base text-slate-700">Book ambulances in emergencies</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Pill className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-base text-slate-700">Buy genuine drugs online with delivery</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-base text-slate-700">Join free health screening campaigns by NGOs</span>
                </div>
              </div>
              
              <div className="pt-3 border-t border-blue-200/50">
                <p className="text-slate-700 leading-relaxed">
                  We are building this app to solve real problems like long hospital waits, difficulty finding the right specialist, hospital strikes, and making quality healthcare more accessible to everyone in Nigeria.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-teal-100 shadow-sm">
              <p className="text-slate-700 leading-relaxed">
                <span className="font-semibold text-primary block mb-1">Your opinion is very valuable — even if you don’t need a doctor right now.</span>
                Your answers will help us build a better app for you, your family, friends, and millions of Nigerians.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
            <div className="flex justify-center">
              <QRCodeSVG
                value={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/survey`}
                size={240}
                level="H"
                includeMargin={true}
                fgColor="#0f172a"
              />
            </div>
            <div className="mt-6 text-center">
              <p className="text-base font-semibold text-slate-800">Scan to take survey</p>
            </div>
          </div>

          <Link 
            href="/survey"
            className="group w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-5 px-8 rounded-2xl font-bold text-xl transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-primary/30"
          >
            Start Survey Now
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>

          <div className="grid grid-cols-3 gap-3 w-full mt-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center hover:border-primary transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <User className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs font-semibold text-slate-700">Patients</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center hover:border-primary transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <UserPlus className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs font-semibold text-slate-700">Doctors</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center hover:border-primary transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs font-semibold text-slate-700">NGOs</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
