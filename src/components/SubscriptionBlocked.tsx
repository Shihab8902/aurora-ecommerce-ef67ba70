import { Lock, AlertTriangle, Mail, Phone } from 'lucide-react';

interface SubscriptionBlockedProps {
  message: string;
}

export function SubscriptionBlocked({ message }: SubscriptionBlockedProps) {
  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4" data-jc-id="TGF4Y2">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" data-jc-id="TGF5VH">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} data-jc-id="TGF6HY"/>
      </div>

      {/* Content */}
      <div className="relative max-w-md w-full text-center" data-jc-id="TGF81V">
        {/* Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/20 flex items-center justify-center mb-8" data-jc-id="TGF8QY">
          <Lock className="w-10 h-10 text-red-400" data-jc-id="TGF9L1"/>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-3" data-jc-id="TGFAAV">Access Suspended</h1>
        
        {/* Message */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8" data-jc-id="A9G3ZO">
          <div className="flex items-start gap-3" data-jc-id="A9G3A2">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" data-jc-id="A9G2NL"/>
            <p className="text-gray-300 text-sm leading-relaxed text-left" data-jc-id="A9G1YL">{message}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4" data-jc-id="A9G14I">
          <a
            href="mailto:support@webify.com"
            className="inline-flex items-center justify-center gap-2 w-full bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold px-6 py-3.5 rounded-xl transition-all active:scale-[0.98]"
          data-jc-id="A9G114">
            <Mail className="w-4 h-4" data-jc-id="A9FYVE"/>
            Contact Support
          </a>
          
          <div className="flex items-center justify-center gap-2 text-gray-500 text-xs" data-jc-id="A9FY4W">
            <Phone className="w-3.5 h-3.5" data-jc-id="A9FXF1"/>
            <span data-jc-id="A9FXBF">Or call +1 (555) 000-0000</span>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-12 text-gray-600 text-xs" data-jc-id="A9FGHE">
          Powered by Webify
        </p>
      </div>
    </div>
  );
}
