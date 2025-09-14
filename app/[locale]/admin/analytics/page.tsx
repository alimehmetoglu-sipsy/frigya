'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  TrendingUp,
  MousePointer,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Activity,
  Download,
  Eye,
  Calendar,
} from 'lucide-react';

interface AnalyticsDashboard {
  visitors: {
    today: number;
    week: number;
    month: number;
    change: number;
  };
  conversions: {
    registrations: number;
    bookings: number;
    contactForms: number;
    rate: number;
  };
  popular: {
    routes: Array<{
      name: string;
      views: number;
      downloads: number;
    }>;
    pages: Array<{
      path: string;
      title: string;
      views: number;
    }>;
    referrers: Array<{
      source: string;
      visitors: number;
    }>;
  };
  behavior: {
    avgSessionDuration: number;
    pagesPerSession: number;
    bounceRate: number;
  };
  devices: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  countries: Array<{
    country: string;
    visitors: number;
    percentage: number;
  }>;
  realTime: {
    activeUsers: number;
    currentPage: string;
  };
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('7d');

  useEffect(() => {
    fetchAnalytics();
  }, [period]); // fetchAnalytics is defined inside component, so it's stable

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/analytics/dashboard?period=${period}`);
      const result = await response.json();

      if (result.success) {
        setAnalytics(result.data);
      } else {
        console.error('Failed to fetch analytics:', result.error);
      }
    } catch (error) {
      console.error('Analytics fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load analytics data</p>
          <button
            onClick={fetchAnalytics}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
  }: {
    title: string;
    value: string | number;
    change?: number;
    icon: React.ComponentType<{ className?: string }>;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-primary-50 rounded-lg">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center text-sm ${
            change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'
          }`}>
            <TrendingUp className={`w-4 h-4 mr-1 ${change < 0 ? 'rotate-180' : ''}`} />
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Phrygian Way Website Analytics & Performance</p>
          </div>

          <div className="mt-4 md:mt-0">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="1d">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
        </div>

        {/* Real-time Stats */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Real-time Activity</h3>
          </div>
          <p className="text-green-700">
            <span className="font-bold">{analytics.realTime.activeUsers}</span> users currently active
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Visitors Today"
            value={analytics.visitors.today.toLocaleString()}
            change={analytics.visitors.change}
            icon={Users}
          />
          <StatCard
            title="Weekly Visitors"
            value={analytics.visitors.week.toLocaleString()}
            icon={TrendingUp}
          />
          <StatCard
            title="Conversion Rate"
            value={`${analytics.conversions.rate}%`}
            icon={MousePointer}
          />
          <StatCard
            title="Avg. Session Duration"
            value={`${analytics.behavior.avgSessionDuration}m`}
            icon={Calendar}
          />
        </div>

        {/* Conversions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Contact Form Submissions"
            value={analytics.conversions.contactForms}
            icon={MousePointer}
          />
          <StatCard
            title="Tour Bookings"
            value={analytics.conversions.bookings}
            icon={Calendar}
          />
          <StatCard
            title="Newsletter Signups"
            value={analytics.conversions.registrations}
            icon={Users}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Popular Routes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold mb-6">Popular Routes</h3>
            <div className="space-y-4">
              {analytics.popular.routes.map((route, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{route.name}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {route.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        {route.downloads} downloads
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Device Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold mb-6">Device Usage</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-blue-600" />
                  <span>Desktop</span>
                </div>
                <span className="font-semibold">{analytics.devices.desktop}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-green-600" />
                  <span>Mobile</span>
                </div>
                <span className="font-semibold">{analytics.devices.mobile}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Tablet className="w-5 h-5 text-purple-600" />
                  <span>Tablet</span>
                </div>
                <span className="font-semibold">{analytics.devices.tablet}%</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold mb-6">Top Pages</h3>
            <div className="space-y-3">
              {analytics.popular.pages.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{page.title}</p>
                    <p className="text-sm text-gray-600">{page.path}</p>
                  </div>
                  <span className="font-semibold text-primary-600">{page.views}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Countries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold mb-6">Top Countries</h3>
            <div className="space-y-3">
              {analytics.countries.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span>{country.country}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{country.visitors}</p>
                    <p className="text-sm text-gray-600">{country.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}