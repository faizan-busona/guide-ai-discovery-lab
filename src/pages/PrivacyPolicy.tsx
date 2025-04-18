
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { Tables } from '@/lib/supabase-types';

type PageContent = Pick<Tables<'pages'>, 'content'>;

const PrivacyPolicy = () => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('content')
        .eq('slug', 'privacy')
        .single();

      if (!error && data) {
        setContent((data as PageContent).content);
      }
      setLoading(false);
    };

    fetchContent();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-12">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-ai-primary" />
          </div>
        ) : (
          <div className="prose prose-gray max-w-none">
            {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
