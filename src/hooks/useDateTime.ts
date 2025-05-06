import { useCallback } from 'react';
import { usePreferredLanguage } from './usePreferredLanguage';

interface DateTimeOptions {
  dateStyle?: 'full' | 'long' | 'medium' | 'short';
  timeStyle?: 'full' | 'long' | 'medium' | 'short';
  hour12?: boolean;
  weekday?: 'long' | 'short' | 'narrow';
  era?: 'long' | 'short' | 'narrow';
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  timeZoneName?: 'long' | 'short';
}

interface RelativeTimeFormatOptions {
  numeric?: 'always' | 'auto';
  style?: 'long' | 'short' | 'narrow';
}

export const useDateTime = () => {
  const { language } = usePreferredLanguage();

  const formatDate = useCallback((
    date: Date | number,
    options: DateTimeOptions = { dateStyle: 'medium' }
  ) => {
    try {
      return new Intl.DateTimeFormat(language, options).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return new Intl.DateTimeFormat('en', options).format(date);
    }
  }, [language]);

  const formatTime = useCallback((
    date: Date | number,
    options: DateTimeOptions = { timeStyle: 'medium' }
  ) => {
    try {
      return new Intl.DateTimeFormat(language, options).format(date);
    } catch (error) {
      console.error('Error formatting time:', error);
      return new Intl.DateTimeFormat('en', options).format(date);
    }
  }, [language]);

  const formatRelativeTime = useCallback((
    value: number,
    unit: Intl.RelativeTimeFormatUnit,
    options: RelativeTimeFormatOptions = { numeric: 'auto', style: 'long' }
  ) => {
    try {
      return new Intl.RelativeTimeFormat(language, options).format(value, unit);
    } catch (error) {
      console.error('Error formatting relative time:', error);
      return new Intl.RelativeTimeFormat('en', options).format(value, unit);
    }
  }, [language]);

  const getRelativeTimeDescriptor = useCallback((date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
    const absoluteDiff = Math.abs(diffInSeconds);

    // Helper function to get the appropriate unit and value
    const getUnitAndValue = (seconds: number): [number, Intl.RelativeTimeFormatUnit] => {
      if (seconds < 60) return [seconds, 'second'];
      if (seconds < 3600) return [Math.floor(seconds / 60), 'minute'];
      if (seconds < 86400) return [Math.floor(seconds / 3600), 'hour'];
      if (seconds < 604800) return [Math.floor(seconds / 86400), 'day'];
      if (seconds < 2629800) return [Math.floor(seconds / 604800), 'week'];
      if (seconds < 31557600) return [Math.floor(seconds / 2629800), 'month'];
      return [Math.floor(seconds / 31557600), 'year'];
    };

    const [value, unit] = getUnitAndValue(absoluteDiff);
    return { value: diffInSeconds < 0 ? -value : value, unit };
  }, []);

  const formatToRelative = useCallback((
    date: Date,
    options?: RelativeTimeFormatOptions
  ) => {
    const { value, unit } = getRelativeTimeDescriptor(date);
    return formatRelativeTime(value, unit, options);
  }, [formatRelativeTime, getRelativeTimeDescriptor]);

  return {
    formatDate,
    formatTime,
    formatRelativeTime,
    formatToRelative,
    getRelativeTimeDescriptor
  };
};