"use client"

import { useEffect, useState } from "react"
import LuxuryNewsletterBox from "./NewsLatterBox" 
import LuxuryContactForm from "./form" 
import LuxuryPromoBanner from "../promo" 
import axios from "axios"
import { toast } from "react-toastify"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react"

const LuxuryContactPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [honey, setHoney] = useState(null)
  const [open, setOpen] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [fl, setFl] = useState(false)

  const showDialog = () => setOpen(true)
  const hideDialog = () => setOpen(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href)
    }
  }, [])

  const onSubmit = (email: string, phone: string, name: string) => {
    const msg = `Hi My Name is ${name} and I am interested in the Exclusive discount For the New Upcoming Project`

    axios
      .post("https://kingsdevelopersapi.co.ke/send", {
        name: `Exclusive_Launch_Discount`,
        email,
        phone,
        message: msg,
        url,
        honey,
      })
      .then(() =>
        toast.success("Your exclusive offer request was submitted successfully! We'll contact you within 24 hours."),
      )
      .catch(() => toast.error("Offer submission failed. Please try again or contact us directly."))
  }

  const sendFeedback = () => {
    if (feedback.length !== 0) {
      setFl(true)
      axios
        .post("https://kingsdevelopersapi.co.ke/send", {
          name: `Feedback_Collection`,
          email,
          phone,
          message: feedback,
          url,
          honey,
        })
        .then(() => {
          toast.success("Thank you for your valuable feedback!")
          setFeedback("")
          setOpen(false)
        })
        .catch(() => toast.error("Feedback submission failed. Please try again."))
        .finally(() => setFl(false))
    } else {
      toast.error("Please enter your feedback before submitting.")
    }
  }

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Promo Banner */}
        <LuxuryPromoBanner onSubmit={onSubmit} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Contact Form */}
          <div className="lg:col-span-2">
            <LuxuryContactForm />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <LuxuryNewsletterBox />
          </div>
        </div>

        {/* Office Locations */}
        <div className="mt-16 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-3xl font-bold text-gray-900">Visit Our Offices</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet our expert team at our conveniently located offices in Nairobi. We're here to help you with all your
              real estate needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Office */}
            <Card className="overflow-hidden shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-gold-500 to-gold-600 text-white">
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Main Office - Kings Developers Ltd</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3165.837457040768!2d36.90347019220299!3d-1.353551595586052!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1213c30de931%3A0x6e2bf7ca35e8355b!2sKings%20Developers%20Ltd!5e0!3m2!1sen!2ske!4v1711113919478!5m2!1sen!2ske"
                  width="100%"
                  height="300"
                  style={{ border: "none" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
                <div className="p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-gold-500" />
                    <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4 text-gold-500" />
                    <span>+254 700 000 000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prism Towers Office */}
            <Card className="overflow-hidden shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-gold-500 to-gold-600 text-white">
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Kings Prism Towers</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.802312154552!2d36.80633487510525!3d-1.2930606356338241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10c22c678c25%3A0x4b5d81e6fa977dcd!2sKings%20Prism%20Towers!5e0!3m2!1sen!2ske!4v1723465685044!5m2!1sen!2ske"
                  width="100%"
                  height="300"
                  style={{ border: "none" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
                <div className="p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-gold-500" />
                    <span>Mon - Sat: 9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4 text-gold-500" />
                    <span>prism@kingsdevelopers.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Feedback Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-gold-500" />
                <span>We Value Your Feedback</span>
              </DialogTitle>
              <DialogDescription>
                Your thoughts help us improve. Please share your feedback about our services at Kings Developers. We
                appreciate your time and insights!
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feedback-message">Your Feedback</Label>
                <Textarea
                  id="feedback-message"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your experience, suggestions, or any feedback about our services..."
                  rows={4}
                  className="resize-none"
                />
              </div>

              <Button
                onClick={sendFeedback}
                disabled={fl}
                className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700"
              >
                {fl ? (
                  <span className="flex items-center justify-center">
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                    Submitting...
                  </span>
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

export default LuxuryContactPage
