
import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LogIn, Mail, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/sonner';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithEmail, signInWithGoogle, user } = useAuth();
  
  // Get return URL from location state or default to dashboard
  const returnUrl = location.state?.returnUrl || '/dashboard';

  useEffect(() => {
    // If user is already logged in, redirect them
    if (user) {
      navigate(returnUrl, { replace: true });
    }
    
    document.title = 'Login | AIGuideHub';
  }, [user, navigate, returnUrl]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await signInWithEmail(email, password);

      if (error) {
        setError(error.message);
        toast.error('Login failed', {
          description: error.message
        });
      } else {
        toast.success('Login successful', {
          description: 'Welcome back!'
        });
        // Redirect will happen automatically in useEffect when auth state updates
      }
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      // Redirect will happen through Supabase OAuth flow
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      toast.error('Google login failed');
    }
  };

  // If already logged in, don't show the login form
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="container max-w-md">
        <div className="bg-white p-8 rounded-lg border">
          <div className="flex justify-between items-center mb-4">
            <Link to="/" className="text-ai-primary hover:underline flex items-center text-sm">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to home
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {error && (
            <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>

          <div className="mt-4 text-center text-sm text-gray-500">
            Test Credentials:
            <br />
            Admin: admin@busona.com / admin123
            <br />
            User: user@busona.com / user123
          </div>
        </div>
      </div>
    </div>
  );
};

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signUpWithEmail, signInWithGoogle, user } = useAuth();

  useEffect(() => {
    // If user is already logged in, redirect them
    if (user) {
      navigate('/dashboard', { replace: true });
    }
    
    document.title = 'Sign Up | AIGuideHub';
  }, [user, navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await signUpWithEmail(email, password, name);

      if (error) {
        setError(error.message);
        toast.error('Signup failed', {
          description: error.message
        });
      } else {
        toast.success('Account created successfully', {
          description: 'You can now sign in with your new account.'
        });
        navigate('/login');
      }
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
      toast.error('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();
      // Redirect will happen through Supabase OAuth flow
    } catch (err: any) {
      setError(err.message || 'Failed to sign up with Google');
      toast.error('Google signup failed');
    }
  };

  // If already logged in, don't show the signup form
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="container max-w-md">
        <div className="bg-white p-8 rounded-lg border">
          <div className="flex justify-between items-center mb-4">
            <Link to="/" className="text-ai-primary hover:underline flex items-center text-sm">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to home
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-gray-600">Sign up to get started</p>
          </div>

          {error && (
            <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  className="pl-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignup}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
